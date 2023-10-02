<?php

namespace WooCommerce_Wishlist\Rest;
use WP_REST_Server;
use WP_REST_Controller;

class SearchProduct extends WP_REST_Controller {
    public function register_route(){
        register_rest_route(
            WW_API_NAME_SPACE,
            'search-product', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_search_product' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'                => $this->get_collection_params()
            )
        ) );
    }

    public function get_search_product( $request ) {
        $search_term = $request->get_param( 'search-params' );

        // Check if the search term is numeric (potential product ID)
        if (is_numeric($search_term)) {
            // Search by product ID
            $args = array(
                'post_type' => 'product',
                'post__in' => array( intval( $search_term ) ),
                'posts_per_page' => 1,
            );
        } else {
            // Search by product title
            $args = array(
                'post_type' => 'product',
                's' => $search_term,
                'posts_per_page' => -1,
            );
        }

        $products = get_posts( $args );

        $data  = [];
        foreach ( $products as $product ) {
            $data[] = $this->prepare_item_for_response( (array)$product, $request );
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

        error_log(print_r($fields, true));

        if( in_array( 'ID', $fields, true ) ) {
            $data['ID'] = $item['ID'];
        }

        if( in_array( 'post_title', $fields, true ) ) {
            $data['post_title'] = $item['post_title'];
        }

//        if( in_array( 'product_image', $fields, true ) ) {
//            $data['product_image'] = $item['product_image'];
//        }

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
            'title'				=> 'globalsettings',
            'type'				=> 'object',
            'properties'		=> [
                'ID' => [
                    'type'			=> 'string',
                    'context'		=> [ 'view' ],
                    'required'		=> true,
                ],
                'post_title' => [
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