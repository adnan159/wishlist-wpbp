<?php

namespace WooCommerce_Wishlist\App;

/*
 * Plugin settings default class
 */
class SettingsDefault {
    public function __construct() {
        $this->global_settings_default();
        $this->product_listing_page_default();
        $this->single_product_page_default();
        $this->my_wishlist_page_default();

        $this->create_default_wishlist_page();
    }

    /**
     * Set global settings default
     *
     * @return void
     */
    public function global_settings_default() {
        $global_settings_default = [
            "enable_wishlist_for" => "all_users",
            "default_wishlist_name" => "New list",
            "exclude_type" => "product",
            "exclude_items" => [],
            "item_count" => true,
            "guest_user_wishlist_days" => 30,
            "enable_for_variation" => true,
            "enable_for_myaccount" => false,
            "multi_wishlist_settings" => true,
            "cart_page_wishlist" => true,
            "popup_enable" => true,
            "popup_title" => "Popup title",
            "popup_button_text" => "Button Text",
            "popup_feature_image_enable" => true,
            "popup_icon_image" => "http://www.gmail.com",
            "theme_default_button_style" => true,
            "popup_button_color" => [
                "background_color" => "#458947",
                "background_hover_color" => "#00484",
                "border_color" => "#69594",
                "border_hover_color" => "1fdasf0px"
            ],
            "popup_button_size" => [
                "border_width" => "1px",
                "border_height" => "1px",
                "border_radios" => "10px",
                "popup_button_margin" => "10px"
            ],
            "popup_notification_text" => "hello",
            "popup_notification_icon" => "http://test/gmail.com",
            "popup_notification_button_text" => "hello"
        ];

        if( ! get_option( 'ww_global_settings' ) ) {
            update_option( 'ww_global_settings', maybe_serialize( $global_settings_default ) );
        }
    }

    /**
     * Set product listing page settings default
     *
     * @return void
     */
    public function product_listing_page_default() {
        $product_listing_page_default = [
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

        if( ! get_option( 'ww_product_listing_settings' ) ) {
            update_option( 'ww_product_listing_settings', maybe_serialize( $product_listing_page_default ) );
        }

    }

    /**
     * Set single product page settings default
     *
     * @return void
     */
    public function single_product_page_default() {
        $single_product_page_default = [
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

        if( ! get_option( 'ww_single_product_page_settings' ) ) {
            update_option( 'ww_single_product_page_settings', maybe_serialize( $single_product_page_default ) );
        }
    }

    /**
     * Set my wishlist page settings default
     *
     * @return void
     */
    public function my_wishlist_page_default() {
        $my_wish_list_page_default = [
            'wishlist_content'          => 'Temp Content',
            'wishlist_page'             => 'true',
            'wishlist_privacy'          => 'true',
            'wishlist_creation_date'    => 'true',
            'wishlist_counted_item'     => 'true',
            'wishlist_action_button'    => [
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

        if( ! get_option( 'my_wishlist_settings' ) ) {
            update_option( 'my_wishlist_settings', maybe_serialize( $my_wish_list_page_default ) );
        }
    }

    /**
     * make a wishlist page when activate the plugin
     *
     * @return void
     */
    public function create_default_wishlist_page() {
        function is_page_slug_exists( $slug ) {
            $args = array(
                'name'        => $slug,
                'post_type'   => 'page',
                'post_status' => 'publish',
                'numberposts' => 1
            );

            $pages = get_posts( $args );

            return ! empty( $pages );
        }

        function create_page_if_not_exists( $slug, $title, $content ) {
            if ( ! is_page_slug_exists( $slug ) ) {
                // Page data
                $page_data = array(
                    'post_title'    => $title,
                    'post_name'     => $slug,
                    'post_content'  => $content,
                    'post_status'   => 'publish',
                    'post_type'     => 'page'
                );

                // Create the page
                wp_insert_post( $page_data );
            }
        }

        $slug = 'wawl-wishlist';
        $title = 'Wishlist';
        $content = '[wawl_wishlist_table/]';

        create_page_if_not_exists( $slug, $title, $content );
    }
}