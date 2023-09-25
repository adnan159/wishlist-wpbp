<?php

namespace WooCommerce_Wishlist\Rest;
use WooCommerce_Wishlist\Engine\Base;
use WooCommerce_Wishlist\App;
use WP_REST_Server;
use WP_REST_Controller;

class MyWishlistPage extends WP_REST_Controller {
    public function register_route(){
        register_rest_route(
            WW_API_NAME_SPACE,
            'my-wishlist-page', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_my_wishlist_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'                => $this->get_collection_params()
            ),
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'edit_my_wishlist_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'				  => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
            )
        ) );
    }

    public function get_my_wishlist_settings() {
        $wish_list_page = [
            'wishlist_content'          => 'Temp Content',
            'wishlist_page'             => 'true',
            'wishlist_privacy'          => 'true',
            'wishlist_creation_date'    => 'true',
            'wishlist_counted_item'     => 'true',
            'wishlist_action_button'             => [
                'share'     => 'true',
                'download'  => 'true',
                'delete'    => 'true'
            ],
            'wishlist_add_to_cart'      => 'true',
            'wishlist_add_recent_view'  => 'true',
            'wishlist_share'            => 'true',
            'wishlist_bulk_action'      => 'true',
            'wishlist_product'          => 'true',
            'wishlist_unit_price'       => 'true',
            'wishlist_quantity'         => 'true',
            'wishlist_stock_status'     => 'true'
        ];

//        update_option( 'my_wishlist_settings', $wish_list_page );

        $my_wishlist_page_settings = new App\MyWishlistPageSettings();
        $response = array( 'message' => 'My Wishlist Page Settings', 'data' => $my_wishlist_page_settings->get_my_wishlist_settings() );
        return new \WP_REST_Response( $response );
    }

    public function edit_my_wishlist_settings( $request ) {


        $my_wishlist_page_settings = new App\MyWishlistPageSettings();
        $prepared = $this->prepare_item_for_database( $request );

        if( is_wp_error( $prepared ) ) {
            return $prepared;
        }

        $updated_data = $my_wishlist_page_settings->edit_my_wishlist_settings( $prepared );

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

        if( isset( $request['wishlist_content'] ) ) {
            $prepared['wishlist_content'] = $request['wishlist_content'];
        }
        if( isset( $request['wishlist_page'] ) ) {
            $prepared['wishlist_page'] = $request['wishlist_page'];
        }
        if( isset( $request['wishlist_privacy'] ) ) {
            $prepared['wishlist_privacy'] = $request['wishlist_privacy'];
        }
        if( isset( $request['wishlist_creation_date'] ) ) {
            $prepared['wishlist_creation_date'] = $request['wishlist_creation_date'];
        }
        if( isset( $request['wishlist_counted_item'] ) ) {
            $prepared['wishlist_counted_item'] = $request['wishlist_counted_item'];
        }
        if( isset( $request['wishlist_action_button'] ) ) {
            if( $request['wishlist_action_button']['share'] ) {
                $prepared['wishlist_action_button']['share'] = $request['wishlist_action_button']['share'];
            }
            if( $request['wishlist_action_button']['download'] ) {
                $prepared['wishlist_action_button']['download'] = $request['wishlist_action_button']['download'];
            }
            if( $request['wishlist_action_button']['delete'] ) {
                $prepared['wishlist_action_button']['delete'] = $request['wishlist_action_button']['delete'];
            }
        }
        if( isset( $request['wishlist_add_to_cart'] ) ) {
            $prepared['wishlist_add_to_cart'] = $request['wishlist_add_to_cart'];
        }
        if( isset( $request['wishlist_add_recent_view'] ) ) {
            $prepared['wishlist_add_recent_view'] = $request['wishlist_add_recent_view'];
        }
        if( isset( $request['wishlist_share'] ) ) {
            $prepared['wishlist_share'] = $request['wishlist_share'];
        }
        if( isset( $request['wishlist_bulk_action'] ) ) {
            $prepared['wishlist_bulk_action'] = $request['wishlist_bulk_action'];
        }
        if( isset( $request['wishlist_product'] ) ) {
            $prepared['wishlist_product'] = $request['wishlist_product'];
        }
        if( isset( $request['wishlist_unit_price'] ) ) {
            $prepared['wishlist_unit_price'] = $request['wishlist_unit_price'];
        }
        if( isset( $request['wishlist_quantity'] ) ) {
            $prepared['wishlist_quantity'] = $request['wishlist_quantity'];
        }
        if( isset( $request['wishlist_stock_status'] ) ) {
            $prepared['wishlist_stock_status'] = $request['wishlist_stock_status'];
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

        $wish_list_page = [
            'wishlist_content'          => 'Temp Content',
            'wishlist_page'             => 'true',
            'wishlist_privacy'          => 'true',
            'wishlist_creation_date'    => 'true',
            'wishlist_counted_item'     => 'true',
            'wishlist_action_button'             => [
                'share'     => 'true',
                'download'  => 'true',
                'delete'    => 'true'
            ],
            'wishlist_add_to_cart'      => 'true',
            'wishlist_add_recent_view'  => 'true',
            'wishlist_share'            => 'true',
            'wishlist_bulk_action'      => 'true',
            'wishlist_product'          => 'true',
            'wishlist_unit_price'       => 'true',
            'wishlist_quantity'         => 'true',
            'wishlist_stock_status'     => 'true'
        ];

        if( in_array( 'wishlist_content', $fields, true ) ) {
            $data['wishlist_content'] = $item['wishlist_content'];
        }

        if( in_array( 'wishlist_page', $fields, true ) ) {
            $data['wishlist_page'] = $item['wishlist_page'];
        }

        if( in_array( 'wishlist_privacy', $fields, true ) ) {
            $data['wishlist_privacy'] = $item['wishlist_privacy'];
        }

        if( in_array( 'wishlist_creation_date', $fields, true ) ) {
            $data['wishlist_creation_date'] = $item['wishlist_creation_date'];
        }

        if( in_array( 'wishlist_counted_item', $fields, true ) ) {
            $data['wishlist_counted_item'] = $item['wishlist_counted_item'];
        }

        if( in_array( 'wishlist_action_button', $fields, true ) ) {
            $data['wishlist_action_button'] = $item['wishlist_action_button'];
        }

        if( in_array( 'wishlist_add_to_cart', $fields, true ) ) {
            $data['wishlist_add_to_cart'] = $item['wishlist_add_to_cart'];
        }

        if( in_array( 'wishlist_add_recent_view', $fields, true ) ) {
            $data['wishlist_add_recent_view'] = $item['wishlist_add_recent_view'];
        }

        if( in_array( 'wishlist_share', $fields, true ) ) {
            $data['wishlist_share'] = $item['wishlist_share'];
        }

        if( in_array( 'wishlist_bulk_action', $fields, true ) ) {
            $data['wishlist_bulk_action'] = $item['wishlist_bulk_action'];
        }

        if( in_array( 'wishlist_product', $fields, true ) ) {
            $data['wishlist_product'] = $item['wishlist_product'];
        }

        if( in_array( 'wishlist_unit_price', $fields, true ) ) {
            $data['wishlist_unit_price'] = $item['wishlist_unit_price'];
        }

        if( in_array( 'wishlist_quantity', $fields, true ) ) {
            $data['wishlist_quantity'] = $item['wishlist_quantity'];
        }

        if( in_array( 'wishlist_stock_status', $fields, true ) ) {
            $data['wishlist_stock_status'] = $item['wishlist_stock_status'];
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
        $base = sprintf( '%s/%s', WW_API_NAME_SPACE, 'my-wishlist-page' );

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
            'title'				=> 'mywishlistpagesettings',
            'type'				=> 'object',
            'properties'		=> [
                'wishlist_content' => [
                    'description'	=> __('My wishlist page title' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'wishlist_page' => [
                    'description'	=> __('Wishlist page' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'wishlist_privacy' => [
                    'description'	=> __('Wishlist Privacy' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'wishlist_creation_date' => [
                    'description'	=> __('Wishlist Creation date' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'wishlist_counted_item' => [
                    'description'	=> __('Wishlist Count item' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'wishlist_action_button' => [
//                    '$schema'			=> 'http://json-schema.org/draft-04/schema#',
                    'description'	=> __('Wishlist Action Button' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'share' => [
                            'description'	=> __('Wishlist Share' ),
                            'type'			=> 'boolean',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false
                        ],
                        'download' => [
                            'description'	=> __('Wishlist Download' ),
                            'type'			=> 'boolean',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false
                        ],
                        'delete' => [
                            'description'	=> __('Wishlist Delete' ),
                            'type'			=> 'boolean',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false
                        ],
                    ]
                ],
                'wishlist_add_to_cart' => [
                    'description'	=> __('Wishlist page add to cart' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ],
                'wishlist_add_recent_view' => [
                    'description'	=> __('Wishlist page add to cart recent views' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ],
                'wishlist_share' => [
                    'description'	=> __('Wishlist share' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ],
                'wishlist_bulk_action' => [
                    'description'	=> __('Wishlist bulk action' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ],
                'wishlist_product' => [
                    'description'	=> __('Wishlist Product' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ],
                'wishlist_unit_price' => [
                    'description'	=> __('Wishlist unit price' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ],
                'wishlist_quantity' => [
                    'description'	=> __('Wishlist quantity' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ],
                'wishlist_stock_status' => [
                    'description'	=> __('Wishlist stock status' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false
                ]
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
