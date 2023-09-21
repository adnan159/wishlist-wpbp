<?php

namespace WooCommerce_Wishlist\Rest;
use WooCommerce_Wishlist\Engine\Base;
use WooCommerce_Wishlist\App;
use WP_REST_Server;
use WP_REST_Controller;

class GlobalSettings extends WP_REST_Controller {
    public function register_route(){
        register_rest_route(
            'wp/wishlist/v1',
        'global-settings', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_global_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'                => $this->get_collection_params()
            ),
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'edit_global_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'				  => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
            )
        ) );
    }

    public function get_global_settings() {
        $general_settings = new App\GlobalSettings();
        $response = array( 'message' => 'Global Settings', 'data' => $general_settings->get_global_settings() );
        return new \WP_REST_Response( $response );
    }

    public function edit_global_settings( $request ) {
        $global_settings_update_data = new App\GlobalSettings();
        $prepared = $this->prepare_item_for_database( $request );

        if( is_wp_error( $prepared ) ) {
            return $prepared;
        }

        $updated_data = $global_settings_update_data->create_global_settings( $prepared );

        $response = $this->prepare_item_for_response( $updated_data, $request );
        $response = rest_ensure_response( $response );

        return $response;
    }

    /**
     * Prepares one item for create or update operation.
     *
     * @param WP_REST_Request $request Request object.
     *
     * @return object|WP_Error The prepared item, or WP_Error object on failure.
     */
    protected function prepare_item_for_database( $request ) {
        $prepared = [];

        if( isset( $request['enable_wishlist_for'] ) ) {
            $prepared['enable_wishlist_for'] = $request['enable_wishlist_for'];
        }
        if( isset( $request['default_wishlist_name'] ) ) {
            $prepared['default_wishlist_name'] = $request['default_wishlist_name'];
        }
        if( isset( $request['exclude_type'] ) ) {
            $prepared['exclude_type'] = $request['exclude_type'];
        }
        if( isset( $request['exclude_items'] ) ) {
            $prepared['exclude_items'] = $request['exclude_items'];
        }
        if( isset( $request['item_count'] ) ) {
            $prepared['item_count'] = $request['item_count'];
        }
        if( isset( $request['guest_user_wishlist_days'] ) ) {
            $prepared['guest_user_wishlist_days'] = $request['guest_user_wishlist_days'];
        }
        if( isset( $request['enable_for_variation'] ) ) {
            $prepared['enable_for_variation'] = $request['enable_for_variation'];
        }
        if( isset( $request['enable_for_myaccount'] ) ) {
            $prepared['enable_for_myaccount'] = $request['enable_for_myaccount'];
        }
        if( isset( $request['multi_wishlist_settings'] ) ) {
            $prepared['multi_wishlist_settings'] = $request['multi_wishlist_settings'];
        }
        if( isset( $request['cart_page_wishlist'] ) ) {
            $prepared['cart_page_wishlist'] = $request['cart_page_wishlist'];
        }

        return $prepared;
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

        error_log(print_r($item, true));

        if( in_array( 'enable_wishlist_for', $fields, true ) ) {
            $data['enable_wishlist_for'] = $item['enable_wishlist_for'];
        }

        if( in_array( 'default_wishlist_name', $fields, true ) ) {
            $data['default_wishlist_name'] = $item['default_wishlist_name'];
        }

        if( in_array( 'exclude_type', $fields, true ) ) {
            $data['exclude_type'] = $item['exclude_type'];
        }

        if( in_array( 'exclude_items', $fields, true ) ) {
            $data['exclude_items'] = $item['exclude_items'];
        }

        if( in_array( 'item_count', $fields, true ) ) {
            $data['item_count'] = $item['item_count'];
        }

        if( in_array( 'guest_user_wishlist_days', $fields, true ) ) {
            $data['guest_user_wishlist_days'] = $item['guest_user_wishlist_days'];
        }

        if( in_array( 'enable_for_variation', $fields, true ) ) {
            $data['enable_for_variation'] = $item['enable_for_variation'];
        }

        if( in_array( 'enable_for_myaccount', $fields, true ) ) {
            $data['enable_for_myaccount'] = $item['enable_for_myaccount'];
        }

        if( in_array( 'multi_wishlist_settings', $fields, true ) ) {
            $data['multi_wishlist_settings'] = $item['multi_wishlist_settings'];
        }

        if( in_array( 'cart_page_wishlist', $fields, true ) ) {
            $data['cart_page_wishlist'] = $item['cart_page_wishlist'];
        }

        $context 	= ! empty( $request['context'] ) ? $request['context'] : 'view';
        $data 		= $this->filter_response_by_context( $data, $context );

        $response = rest_ensure_response( $data );
        $response->add_links( $this->prepare_links( $item ) );

        return $response;
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
        $base = sprintf( '%s/%s', 'wp/wishlist/v1', 'global-settings' );

        $links = [
            'self'	=> [
                'href' => rest_url( trailingslashit( $base ) . $item->id ),
            ],
            'collection' => [
                'href'	=> rest_url( $base ),
            ]
        ];

        return $links;
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
                'enable_wishlist_for' => [
                    'description'	=> __('Enable Wishlist for all user' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> true,
                ],
                'default_wishlist_name' => [
                    'description'	=> __('Name of Wishlist' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'exclude_type' => [
                    'description'	=> __('Exclude Type' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'exclude_items' => [
                    'description'	=> __('Exclude Items' ),
                    'type'			=> 'array',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'item_count' => [
                    'description'	=> __('Item count' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'guest_user_wishlist_days' => [
                    'description'	=> __('Enter Days ' ),
                    'type'			=> 'integer',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'enable_for_variation' => [
                    'description'	=> __('Enable for Variation Product' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'enable_for_myaccount' => [
                    'description'	=> __('Enable for my account ' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'multi_wishlist_settings' => [
                    'description'	=> __('Enable multi-wishlist' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'cart_page_wishlist' => [
                    'description'	=> __('Enable for cart page' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
            ],
        ];

        $this->schema = $schema;

        return $this->add_additional_fields_schema( $this->schema );
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
