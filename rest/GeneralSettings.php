<?php

namespace WooCommerce_Wishlist\Rest;
use WooCommerce_Wishlist\Engine\Base;
use WooCommerce_Wishlist\App;

class GeneralSettings extends Base {
    public function register_route(){
        register_rest_route(
            'wp/wishlist/v1',
        'general-settings', array(
            array(
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_general_settings' ),
    //                'permission_callback' => array( $this, 'get_items_permissions_check' ),
    //                'args'                => array(

    //                ),
            ),
            array(
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_general_settings' ),
                'permission_callback' => '__return_true',
    //                'args'                => \WP_REST_Controller::get_endpoint_args_for_item_schema( \WP_REST_Server::CREATABLE ),
            ),
        ) );
    }

    public function get_general_settings() {
        $general_settings = new App\GeneralCrud();
        return $general_settings->get_general_settings();
    }

    public function create_general_settings( \WP_REST_Request $request ) {
        $general_settings = new App\GeneralCrud();
        return $general_settings->create_general_settings( $request->get_params() );
    }
}
