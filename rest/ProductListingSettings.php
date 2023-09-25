<?php

namespace WooCommerce_Wishlist\Rest;
use WooCommerce_Wishlist\Engine\Base;
use WooCommerce_Wishlist\App;
use WP_REST_Server;
use WP_REST_Controller;


class ProductListingSettings extends WP_REST_Controller {
    public function register_route(){
        register_rest_route(
            WW_API_NAME_SPACE,
            'product-listing-settings', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_product_listing_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'                => $this->get_collection_params()
            ),
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'edit_product_listing_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'				  => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
            )
        ) );
    }

    public function get_product_listing_settings() {
        $data = [
            'listing_settings_enable'   => 'true',
            'listing_button_position'   => 'On image top left',
            'listing_button_type'       => 'icon',
            'listing_icon'              => 'heart',
            'listing_theme_default'     => 'true',
            'listing_icon_style'        => [
                'icon_size'         => '10px',
                'icon_color'        => '#958303',
                'icon_hover_color'  => '#4359078'
            ],
            'listing_text_style'    => [
                'text_size'         => '10px',
                'text_color'        => '#48957435',
                'text_hover_color'  => '#439578'
            ],
            'listing_button_color'  => [
                'background_color'          => '#349058',
                'background_hover_color'    => '#458943',
                'border_color'              => '#456544',
                'border_hover_color'        => '#349054'
            ],
            'listing_button_size'       => [
                'border_width'      => '10px',
                'border_height'     => '10px',
                'border_radios'     => '10px',
                'margin'            => '10px'
            ]
        ];

        $general_settings = new App\ProductListingSettings();
        $response = array( 'message' => 'Product Listing Settings', 'data' => $general_settings->get_product_listing_settings() );
        return new \WP_REST_Response( $response );
    }

    public function edit_product_listing_settings( $request ) {

        $product_listing_settings = new App\ProductListingSettings();
        $prepared = $this->prepare_item_for_database( $request );

        if( is_wp_error( $prepared ) ) {
            return $prepared;
        }

        $updated_data = $product_listing_settings->create_product_listing_settings( $prepared );

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

        if( isset( $request['listing_settings_enable'] ) ) {
            $prepared['listing_settings_enable'] = $request['listing_settings_enable'];
        }
        if( isset( $request['listing_button_position'] ) ) {
            $prepared['listing_button_position'] = $request['listing_button_position'];
        }
        if( isset( $request['listing_button_type'] ) ) {
            $prepared['listing_button_type'] = $request['listing_button_type'];
        }
        if( isset( $request['listing_icon'] ) ) {
            $prepared['listing_icon'] = $request['listing_icon'];
        }
        if( isset( $request['listing_theme_default'] ) ) {
            $prepared['listing_theme_default'] = $request['listing_theme_default'];
        }
        if( isset( $request['listing_icon_style'] ) ) {
            if( $request['listing_icon_style']['icon_size'] ) {
                $prepared['listing_icon_style']['icon_size'] = $request['listing_icon_style']['icon_size'];
            }
            if( $request['listing_icon_style']['icon_color'] ) {
                $prepared['listing_icon_style']['icon_color'] = $request['listing_icon_style']['icon_color'];
            }
            if( $request['listing_icon_style']['icon_hover_color'] ) {
                $prepared['listing_icon_style']['icon_hover_color'] = $request['listing_icon_style']['icon_hover_color'];
            }
        }
        if( isset( $request['listing_text_style'] ) ) {
            if( $request['listing_text_style']['text_size'] ) {
                $prepared['listing_text_style']['text_size'] = $request['listing_text_style']['text_size'];
            }
            if( $request['listing_text_style']['text_color'] ) {
                $prepared['listing_text_style']['text_color'] = $request['listing_text_style']['text_color'];
            }
            if( $request['listing_text_style']['text_hover_color'] ) {
                $prepared['listing_text_style']['text_hover_color'] = $request['listing_text_style']['text_hover_color'];
            }
        }
        if( isset( $request['listing_button_color'] ) ) {
            if( $request['listing_button_color']['background_color'] ) {
                $prepared['listing_button_color']['background_color'] = $request['listing_button_color']['background_color'];
            }
            if( $request['listing_button_color']['background_hover_color'] ) {
                $prepared['listing_button_color']['background_hover_color'] = $request['listing_button_color']['background_hover_color'];
            }
            if( $request['listing_button_color']['border_color'] ) {
                $prepared['listing_button_color']['border_color'] = $request['listing_button_color']['border_color'];
            }
            if( $request['listing_button_color']['border_hover_color'] ) {
                $prepared['listing_button_color']['border_hover_color'] = $request['listing_button_color']['border_hover_color'];
            }
        }
        if( isset( $request['listing_button_size'] ) ) {
            if( $request['listing_button_size']['border_width'] ) {
                $prepared['listing_button_size']['border_width'] = $request['listing_button_size']['border_width'];
            }
            if( $request['listing_button_size']['border_height'] ) {
                $prepared['listing_button_size']['border_height'] = $request['listing_button_size']['border_height'];
            }
            if( $request['listing_button_size']['border_radios'] ) {
                $prepared['listing_button_size']['border_radios'] = $request['listing_button_size']['border_radios'];
            }
            if( $request['listing_button_size']['margin'] ) {
                $prepared['listing_button_size']['margin'] = $request['listing_button_size']['margin'];
            }
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

        if( in_array( 'listing_settings_enable', $fields, true ) ) {
            $data['listing_settings_enable'] = $item['listing_settings_enable'];
        }

        if( in_array( 'listing_button_position', $fields, true ) ) {
            $data['listing_button_position'] = $item['listing_button_position'];
        }

        if( in_array( 'listing_button_type', $fields, true ) ) {
            $data['listing_button_type'] = $item['listing_button_type'];
        }

        if( in_array( 'listing_icon', $fields, true ) ) {
            $data['listing_icon'] = $item['listing_icon'];
        }

        if( in_array( 'listing_theme_default', $fields, true ) ) {
            $data['listing_theme_default'] = $item['listing_theme_default'];
        }

        if( in_array( 'listing_icon_style', $fields, true ) ) {
            $data['listing_icon_style'] = $item['listing_icon_style'];
        }

        if( in_array( 'listing_text_style', $fields, true ) ) {
            $data['listing_text_style'] = $item['listing_text_style'];
        }

        if( in_array( 'listing_button_color', $fields, true ) ) {
            $data['listing_button_color'] = $item['listing_button_color'];
        }

        if( in_array( 'listing_button_size', $fields, true ) ) {
            $data['listing_button_size'] = $item['listing_button_size'];
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
        $base = sprintf( '%s/%s', WW_API_NAME_SPACE, 'product-listing-settings' );

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

        $data = [
            'listing_settings_enable'   => 'true',
            'listing_button_position'   => 'On image top left',
            'listing_button_type'       => 'icon',
            'listing_icon'              => 'heart',
            'listing_theme_default'     => 'true',
            'listing_icon_style'        => [
                'icon_size'         => '10px',
                'icon_color'        => '#958303',
                'icon_hover_color'  => '#4359078'
            ],
            'listing_button_color'  => [
                'background_color'          => '#349058',
                'background_hover_color'    => '#458943',
                'border_color'              => '#456544',
                'border_hover_color'        => '#349054'
            ],
            'listing_button_size'       => [
                'border_width'      => '10px',
                'border_height'     => '10px',
                'border_radios'     => '10px',
                'margin'            => '10px'
            ]
        ];

        $schema = [
            '$schema'			=> 'http://json-schema.org/draft-04/schema#',
            'title'				=> 'globalsettings',
            'type'				=> 'object',
            'properties'		=> [
                'listing_settings_enable' => [
                    'description'	=> __('Listing enable satatus' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'listing_button_position' => [
                    'description'	=> __('Listing button position ' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'listing_button_type' => [
                    'description'	=> __('Listing Button type' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'listing_icon' => [
                    'description'	=> __('Listing Icon' ),
                    'type'			=> 'url',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_url',
                    ],
                ],
                'listing_theme_default' => [
                    'description'	=> __('Listing theme default status' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'listing_icon_style' => [
//                    '$schema'			=> 'http://json-schema.org/draft-04/schema#',
                    'description'	=> __('Popup Button Color' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'icon_size' => [
                            'description'	=> __('Listing icon size' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'icon_color' => [
                            'description'	=> __('Listing icon Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'icon_hover_color' => [
                            'description'	=> __('Listing icon Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                    ]
                ],
                'listing_text_style' => [
//                    '$schema'			=> 'http://json-schema.org/draft-04/schema#',
                    'description'	=> __('Listing text style' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'text_size' => [
                            'description'	=> __('Listing custom text size' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'text_color' => [
                            'description'	=> __('Listing custom text color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'text_hover_color' => [
                            'description'	=> __('Listing custom Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                    ]
                ],
                'listing_button_color' => [
                    'description'	=> __('Listing Button Color' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'background_color' => [
                            'description'	=> __('Listing Background Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'background_hover_color' => [
                            'description'	=> __('Listing Background Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_color' => [
                            'description'	=> __('Listing Border Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_hover_color' => [
                            'description'	=> __('Listing Border Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                    ]
                ],
                'listing_button_size' => [
                    'description'	=> __('Listing Button Size' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'border_width' => [
                            'description'	=> __('Listing button Border Width' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_height' => [
                            'description'	=> __('Listing button Border Height' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'popup_button_margin' => [
                            'description'	=> __('Listing button margin' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_radios' => [
                            'description'	=> __('Listing button Border radios' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],

                    ]
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
