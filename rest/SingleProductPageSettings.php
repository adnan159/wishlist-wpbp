<?php

namespace WooCommerce_Wishlist\Rest;
use WooCommerce_Wishlist\Engine\Base;
use WooCommerce_Wishlist\App;
use WP_REST_Server;
use WP_REST_Controller;


class SingleProductPageSettings extends WP_REST_Controller {
    public function register_route(){
        register_rest_route(
            'wp/wishlist/v1',
            'single-product-page-settings', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_single_product_page_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'                => $this->get_collection_params()
            ),
            array(
                'methods'             => WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'edit_single_product_page_settings' ),
                'permission_callback' => array( $this, 'get_item_permissions_check' ),
                'args'				  => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
            )
        ) );
    }

    public function get_single_product_page_settings() {
        $data = [
            'single_product_page_status'            => 'true',
            'single_product_page_button_position'   => 'On image top left',
            'single_product_page_button_type'       => 'icon',
            'single_product_page_button_text'       => 'Add to wishlist',
            'single_product_page_icon'              => 'heart',
            'single_product_page_theme_default'     => 'true',
            'single_product_page_icon_style'        => [
                'icon_size'         => '10px',
                'icon_color'        => '#958303',
                'icon_hover_color'  => '#4359078'
            ],
            'single_product_page_text_style'        => [
                'text_size'         => '10px',
                'text_color'        => '#48957435',
                'text_hover_color'  => '#439578'
            ],
            'single_product_page__button_color'     => [
                'background_color'          => '#349058',
                'background_hover_color'    => '#458943',
                'border_color'              => '#456544',
                'border_hover_color'        => '#349054'
            ],
            'single_product_page_button_size'       => [
                'border_width'      => '10px',
                'border_height'     => '10px',
                'border_radios'     => '10px',
                'margin'            => '10px'
            ]
        ];

        $general_settings = new App\SingleProductPageSettings();
        $response = array( 'message' => 'Product Listing Settings', 'data' => $general_settings->get_single_product_page_settings() );
        return new \WP_REST_Response( $response );
    }

    public function edit_single_product_page_settings( $request ) {

        $single_product_page_settings = new App\SingleProductPageSettings();
        $prepared = $this->prepare_item_for_database( $request );

        if( is_wp_error( $prepared ) ) {
            return $prepared;
        }

        $updated_data = $single_product_page_settings->create_single_product_page_settings( $prepared );

//        return $updated_data;

        $response = $this->prepare_item_for_response( $updated_data, $request );
//        $response = rest_ensure_response( $response );

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

        if( isset( $request['single_product_page_status'] ) ) {
            $prepared['single_product_page_status'] = $request['single_product_page_status'];
        }
        if( isset( $request['single_product_page_button_position'] ) ) {
            $prepared['single_product_page_button_position'] = $request['single_product_page_button_position'];
        }
        if( isset( $request['single_product_page_button_type'] ) ) {
            $prepared['single_product_page_button_type'] = $request['single_product_page_button_type'];
        }
        if( isset( $request['single_product_page_button_text'] ) ) {
            $prepared['single_product_page_button_text'] = $request['single_product_page_button_text'];
        }
        if( isset( $request['single_product_page_icon'] ) ) {
            $prepared['single_product_page_icon'] = $request['single_product_page_icon'];
        }
        if( isset( $request['single_product_page_theme_default'] ) ) {
            $prepared['single_product_page_theme_default'] = $request['single_product_page_theme_default'];
        }
        if( isset( $request['single_product_page_icon_style'] ) ) {
            if( $request['single_product_page_icon_style']['icon_size'] ) {
                $prepared['single_product_page_icon_style']['icon_size'] = $request['single_product_page_icon_style']['icon_size'];
            }
            if( $request['single_product_page_icon_style']['icon_color'] ) {
                $prepared['single_product_page_icon_style']['icon_color'] = $request['single_product_page_icon_style']['icon_color'];
            }
            if( $request['single_product_page_icon_style']['icon_hover_color'] ) {
                $prepared['single_product_page_icon_style']['icon_hover_color'] = $request['single_product_page_icon_style']['icon_hover_color'];
            }
        }
        if( isset( $request['single_product_page_text_style'] ) ) {
            if( $request['single_product_page_text_style']['text_size'] ) {
                $prepared['single_product_page_text_style']['text_size'] = $request['single_product_page_text_style']['text_size'];
            }
            if( $request['single_product_page_text_style']['text_color'] ) {
                $prepared['single_product_page_text_style']['text_color'] = $request['single_product_page_text_style']['text_color'];
            }
            if( $request['single_product_page_text_style']['text_hover_color'] ) {
                $prepared['single_product_page_text_style']['text_hover_color'] = $request['single_product_page_text_style']['text_hover_color'];
            }
        }
        if( isset( $request['single_product_page_button_color'] ) ) {
            if( $request['single_product_page_button_color']['background_color'] ) {
                $prepared['single_product_page_button_color']['background_color'] = $request['single_product_page_button_color']['background_color'];
            }
            if( $request['single_product_page_button_color']['background_hover_color'] ) {
                $prepared['single_product_page_button_color']['background_hover_color'] = $request['single_product_page_button_color']['background_hover_color'];
            }
            if( $request['single_product_page_button_color']['border_color'] ) {
                $prepared['single_product_page_button_color']['border_color'] = $request['single_product_page_button_color']['border_color'];
            }
            if( $request['single_product_page_button_color']['border_hover_color'] ) {
                $prepared['single_product_page_button_color']['border_hover_color'] = $request['single_product_page_button_color']['border_hover_color'];
            }
        }
        if( isset( $request['single_product_page_button_size'] ) ) {
            if( $request['single_product_page_button_size']['border_width'] ) {
                $prepared['single_product_page_button_size']['border_width'] = $request['single_product_page_button_size']['border_width'];
            }
            if( $request['single_product_page_button_size']['border_height'] ) {
                $prepared['single_product_page_button_size']['border_height'] = $request['single_product_page_button_size']['border_height'];
            }
            if( $request['single_product_page_button_size']['border_radios'] ) {
                $prepared['single_product_page_button_size']['border_radios'] = $request['single_product_page_button_size']['border_radios'];
            }
            if( $request['single_product_page_button_size']['margin'] ) {
                $prepared['single_product_page_button_size']['margin'] = $request['single_product_page_button_size']['margin'];
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

        error_log(print_r($fields, true));

        if( in_array( 'single_product_page_status', $fields, true ) ) {
            $data['single_product_page_status'] = $item['single_product_page_status'];
        }

        if( in_array( 'single_product_page_button_position', $fields, true ) ) {
            $data['single_product_page_button_position'] = $item['single_product_page_button_position'];
        }

        if( in_array( 'single_product_page_button_type', $fields, true ) ) {
            $data['single_product_page_button_type'] = $item['single_product_page_button_type'];
        }

        if( in_array( 'single_product_page_button_text', $fields, true ) ) {
            $data['single_product_page_button_text'] = $item['single_product_page_button_text'];
        }

        if( in_array( 'single_product_page_icon', $fields, true ) ) {
            $data['single_product_page_icon'] = $item['single_product_page_icon'];
        }

        if( in_array( 'single_product_page_theme_default', $fields, true ) ) {
            $data['single_product_page_theme_default'] = $item['single_product_page_theme_default'];
        }

        if( in_array( 'single_product_page_icon_style', $fields, true ) ) {
            $data['single_product_page_icon_style'] = $item['single_product_page_icon_style'];
        }

        if( in_array( 'single_product_page_text_style', $fields, true ) ) {
            $data['single_product_page_text_style'] = $item['single_product_page_text_style'];
        }

        if( in_array( 'single_product_page_button_color', $fields, true ) ) {
            $data['single_product_page_button_color'] = $item['single_product_page_button_color'];
        }

        if( in_array( 'single_product_page_button_size', $fields, true ) ) {
            $data['single_product_page_button_size'] = $item['single_product_page_button_size'];
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
        $base = sprintf( '%s/%s', 'wp/wishlist/v1', 'product-listing-settings' );

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
            'single_product_page_status'            => 'true',
            'single_product_page_button_position'   => 'On image top left',
            'single_product_page_button_type'       => 'icon',
            'single_product_page_button_text'       => 'Add to wishlist',
            'single_product_page_icon'              => 'heart',
            'single_product_page_theme_default'     => 'true',
            'single_product_page_icon_style'        => [
                'icon_size'         => '10px',
                'icon_color'        => '#958303',
                'icon_hover_color'  => '#4359078'
            ],
            'single_product_page_text_style'        => [
                'text_size'         => '10px',
                'text_color'        => '#48957435',
                'text_hover_color'  => '#439578'
            ],
            'single_product_page__button_color'     => [
                'background_color'          => '#349058',
                'background_hover_color'    => '#458943',
                'border_color'              => '#456544',
                'border_hover_color'        => '#349054'
            ],
            'single_product_page_button_size'       => [
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
                'single_product_page_status' => [
                    'description'	=> __('Single Product page enable status' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'single_product_page_button_position' => [
                    'description'	=> __('Single product page button position ' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'single_product_page_button_type' => [
                    'description'	=> __('Single Product page Button type' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'single_product_page_button_text' => [
                    'description'	=> __('Single Product page Button text' ),
                    'type'			=> 'string',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_text_field',
                    ],
                ],
                'single_product_page_icon' => [
                    'description'	=> __('Single Product page Icon' ),
                    'type'			=> 'url',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                    'arg_options'	=> [
                        'sanitize_callback'	=> 'sanitize_url',
                    ],
                ],
                'single_product_page_theme_default' => [
                    'description'	=> __('Single Product page theme default status' ),
                    'type'			=> 'boolean',
                    'context'		=> [ 'view', 'edit' ],
                    'required'		=> false,
                ],
                'single_product_page_icon_style' => [
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
                'single_product_page_text_style' => [
//                    '$schema'			=> 'http://json-schema.org/draft-04/schema#',
                    'description'	=> __('Single product page text Color' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'text_size' => [
                            'description'	=> __('Single product page text size' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'text_color' => [
                            'description'	=> __('Single product page text Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'text_hover_color' => [
                            'description'	=> __('Single product page text Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                    ]
                ],
                'single_product_page_button_color' => [
                    'description'	=> __('Single product page Button Color' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'background_color' => [
                            'description'	=> __('Single product page button Background Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'background_hover_color' => [
                            'description'	=> __('Single product page button Background Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_color' => [
                            'description'	=> __('Single product page button Border Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_hover_color' => [
                            'description'	=> __('Single product page button Border Hover Color' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                    ]
                ],
                'single_product_page_button_size' => [
                    'description'	=> __('Single product page Button Size' ),
                    'type'			=> 'object',
                    'properties'    => [
                        'border_width' => [
                            'description'	=> __('Single product page button Border Width' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_height' => [
                            'description'	=> __('Single product page button Border Height' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'border_radios' => [
                            'description'	=> __('Single product page button Border radios' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ],
                        'margin' => [
                            'description'	=> __('Single product page button margin' ),
                            'type'			=> 'string',
                            'context'		=> [ 'view', 'edit' ],
                            'required'		=> false,
                            'arg_options'	=> [
                                'sanitize_callback'	=> 'sanitize_text_field',
                            ],
                        ]
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
