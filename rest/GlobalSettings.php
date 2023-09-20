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
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_global_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'                => $this->get_collection_params()
            )
        ) );


    }

    public function get_global_settings() {
        $general_settings = new App\GlobalSettings();
        $response = array( 'message' => 'Global Settings', 'data' => $general_settings->get_global_settings() );
        return new \WP_REST_Response( $response );
    }

    public function create_global_settings( $request ) {
        $general_settings = new App\GlobalSettings();
        $response = array( 'message' => 'Data received successfully', 'data' => $general_settings->create_global_settings( $request->get_params() ) );
        return new \WP_REST_Response($response, 200);
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
                'id' => [
                    'description'	=> __('Unique identifier for object' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'readonly'		=> true,
                    'required'		=> true,
                ],
                'name' => [
                    'description'	=> __('Name of Wishlist' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> true,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'status' => [
                    'description'	=> __('Enable wishlist for' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> true,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'exclude' => [
                    'description'	=> __('Exclude Product/Category' ),
                    'type'			=> 'array',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> true,
                ],
                'days' => [
                    'description'	=> __('Enter Days ' ),
                    'type'			=> 'integer',
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
