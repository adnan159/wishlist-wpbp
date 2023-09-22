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
        if( isset( $request['popup_enable'] ) ) {
            $prepared['popup_enable'] = $request['popup_enable'];
        }
        if( isset( $request['popup_title'] ) ) {
            $prepared['popup_title'] = $request['popup_title'];
        }
        if( isset( $request['popup_button_text'] ) ) {
            $prepared['popup_button_text'] = $request['popup_button_text'];
        }
        if( isset( $request['popup_feature_image_enable'] ) ) {
            $prepared['popup_feature_image_enable'] = $request['popup_feature_image_enable'];
        }
        if( isset( $request['popup_icon_image'] ) ) {
            $prepared['popup_icon_image'] = $request['popup_icon_image'];
        }
        if( isset( $request['theme_default_button_style'] ) ) {
            $prepared['theme_default_button_style'] = $request['theme_default_button_style'];
        }
        if( isset( $request['popup_button_color'] ) ) {
            if( $request['popup_button_color']['background_color'] ) {
                $prepared['popup_button_color']['background_color'] = $request['popup_button_color']['background_color'];
            }
            if( $request['popup_button_color']['background_hover_color'] ) {
                $prepared['popup_button_color']['background_hover_color'] = $request['popup_button_color']['background_hover_color'];
            }
            if( $request['popup_button_color']['border_color'] ) {
                $prepared['popup_button_color']['border_color'] = $request['popup_button_color']['border_color'];
            }
            if( $request['popup_button_color']['border_hover_color'] ) {
                $prepared['popup_button_color']['border_hover_color'] = $request['popup_button_color']['border_hover_color'];
            }
        }
        if( isset( $request['popup_button_size'] ) ) {
            if( $request['popup_button_size']['border_width'] ) {
                $prepared['popup_button_size']['border_width'] = $request['popup_button_size']['border_width'];
            }
            if( $request['popup_button_size']['border_height'] ) {
                $prepared['popup_button_size']['border_height'] = $request['popup_button_size']['border_height'];
            }
            if( $request['popup_button_size']['border_radios'] ) {
                $prepared['popup_button_size']['border_radios'] = $request['popup_button_size']['border_radios'];
            }
            if( $request['popup_button_size']['popup_button_margin'] ) {
                $prepared['popup_button_size']['popup_button_margin'] = $request['popup_button_size']['popup_button_margin'];
            }
        }
        if( isset( $request['popup_notification_text'] ) ) {
            $prepared['popup_notification_text'] = $request['popup_notification_text'];
        }
        if( isset( $request['popup_notification_icon'] ) ) {
            $prepared['popup_notification_icon'] = $request['popup_notification_icon'];
        }
        if( isset( $request['popup_notification_button_text'] ) ) {
            $prepared['popup_notification_button_text'] = $request['popup_notification_button_text'];
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

        if( in_array( 'popup_enable', $fields, true ) ) {
            $data['popup_enable'] = $item['popup_enable'];
        }

        if( in_array( 'popup_title', $fields, true ) ) {
            $data['popup_title'] = $item['popup_title'];
        }

        if( in_array( 'popup_button_text', $fields, true ) ) {
            $data['popup_button_text'] = $item['popup_button_text'];
        }

        if( in_array( 'popup_feature_image_enable', $fields, true ) ) {
            $data['popup_feature_image_enable'] = $item['popup_feature_image_enable'];
        }

        if( in_array( 'popup_icon_image', $fields, true ) ) {
            $data['popup_icon_image'] = $item['popup_icon_image'];
        }

        if( in_array( 'theme_default_button_style', $fields, true ) ) {
            $data['theme_default_button_style'] = $item['theme_default_button_style'];
        }

        if( in_array( 'popup_button_color', $fields, true ) ) {
            $data['popup_button_color'] = $item['popup_button_color'];
        }

        if( in_array( 'popup_button_size', $fields, true ) ) {
            $data['popup_button_size'] = $item['popup_button_size'];
        }

        if( in_array( 'popup_notification_text', $fields, true ) ) {
            $data['popup_notification_text'] = $item['popup_notification_text'];
        }

        if( in_array( 'popup_notification_icon', $fields, true ) ) {
            $data['popup_notification_icon'] = $item['popup_notification_icon'];
        }

        if( in_array( 'popup_notification_button_text', $fields, true ) ) {
            $data['popup_notification_button_text'] = $item['popup_notification_button_text'];
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
                'popup_enable' => [
                    'description'	=> __('Popup Enable/Disable' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'popup_title' => [
                    'description'	=> __('Popup Title' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'popup_button_text' => [
                    'description'	=> __('Popup Button Text' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'popup_feature_image_enable' => [
                    'description'	=> __('Popup feature image Enable/Disable' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'popup_icon_image' => [
                    'description'	=> __('Popup Icon Image' ),
                    'type'			=> 'url',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_url',
                    ],
                ],
                'theme_default_button_style' => [
                    'description'	=> __('Popup button style Enable/Disable' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'popup_button_color' => [
                    'description'	=> __('Popup Button Color' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'background_color' => [
                            'description'	=> __('Popup button Background Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                        'background_hover_color' => [
                            'description'	=> __('Popup button Background Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                        'border_color' => [
                            'description'	=> __('Popup button Border Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                        'border_hover_color' => [
                            'description'	=> __('Popup button Border Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                    ]
                ],
                'popup_button_size' => [
                    'description'	=> __('Popup Button Size' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'border_width' => [
                            'description'	=> __('Popup button Border Width' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                        'border_height' => [
                            'description'	=> __('Popup button Border Height' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                        'popup_button_margin' => [
                            'description'	=> __('Popup button margin' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                        'border_radios' => [
                            'description'	=> __('Popup button Border radios' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                        ],
                    ]
                ],
                'popup_notification_text' => [
                    'description'	=> __('Popup Notification Text' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'popup_notification_icon' => [
                    'description'	=> __('Popup Notification Icon' ),
                    'type'			=> 'url',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_url',
                    ],
                ],
                'popup_notification_button_text' => [
                    'description'	=> __('Popup Notification Button Text' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
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
