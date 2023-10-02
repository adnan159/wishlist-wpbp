<?php

namespace WooCommerce_Wishlist\Rest;
use WP_REST_Server;
use WP_REST_Controller;

class SearchCategories extends WP_REST_Controller {
    public function register_route(){
        register_rest_route(
            WW_API_NAME_SPACE,
            'search-categories', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_search_categories' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'                => $this->get_collection_params()
            )
        ) );
    }

    public function get_search_categories( $request ) {
        $search_term = $request->get_param( 'search-params' );

        // Check if the search term is numeric (potential category ID)
        if ( is_numeric( $search_term ) ) {
            // Search by category ID
            $args = array(
                'taxonomy' => 'product_cat',
                'include' => array( intval( $search_term ) ),
            );
        } else {
            // Search by category name
            $args = array(
                'taxonomy' => 'product_cat',
                'name__like' => $search_term,
            );
        }

        $categories = get_terms($args);

        $data  = [];
        foreach ( $categories as $category ) {
            $data[] = $this->prepare_item_for_response( (array)$category, $request );
        }

        $total = count( $data );
        $response = rest_ensure_response( $data );
        $response->add_links( $this->prepare_links( $response ) );

        $response->header( 'X-WP-Total', (int) $total );
        $response->header( 'X-WP-TotalPages', (int) $total );

        return $response;
    }

    /**
     * Prepare the items for REST resopne
     *
     * @param mixed 	$item 		WordPress repesentation for items
     * @param \WP_REST_Request $request request object
     *
     * @return \WP_Error || WP_REST_Response
     */
    public function prepare_item_for_response( $item, $request ) {
        $data 	= [];
        $fields = $this->get_fields_for_response( $request );

        if( in_array( 'term_id', $fields, true ) ) {
            $data['term_id'] = $item['term_id'];
        }

        if( in_array( 'name', $fields, true ) ) {
            $data['name'] = $item['name'];
        }

        $context 	= ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data 		= $this->filter_response_by_context( $data, $context );

        return $data;
    }

    /**
     * Retrive the contacts schema, conforming to JSON schema
     *
     * @return array
     */
    public function get_item_schema() {
        if( $this->schema ) {
            return $this->add_additional_fields_schema( $this->schema );
        }
        $schema = [
            '$schema'			=> 'http://json-schema.org/draft-04/schema#',
            'title'				=> 'categories',
            'type'				=> 'object',
            'properties'		=> [
                'term_id' => [
                    'type'			=> 'string',
                    'context'		=> [ 'view' ],
                    'required'		=> true,
                ],
                'name' => [
                    'type'			=> 'string',
                    'context'		=> [ 'view' ],
                    'required'		=> false,
                ],
            ],
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
    }

    /**
     * Checks if the the request has access to read contacts
     *
     * @param \WP_REST_Request $request
     *
     * @return boolean
     */
    public function get_item_permissions_check( $request ) {
        if( ! current_user_can( 'manage_options' ) ) {
            return false;
        }
        return true;
    }

    /**
     * Prepare link for request
     *
     * @param \WP_Post $post post object
     *
     * @return array link for the given post
     */
    public function prepare_links( $item ) {
        $base = sprintf( '%s/%s', WW_API_NAME_SPACE, 'search-prodduct' );

        $links = [
            'self'	=> [
                'href' => rest_url( trailingslashit( $base ) ),
            ],
            'collection' => [
                'href'	=> rest_url( $base ),
            ]
        ];

        return $links;
    }


    /**
     * Retrive the query params for collection
     *
     * @return array
     */
    public function get_collection_params() {
        $params = parent::get_collection_params();

        unset( $params['search'] );
        unset( $params['page']);

        return $params;
    }
}