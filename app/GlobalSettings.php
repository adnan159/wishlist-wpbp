<?php

namespace WooCommerce_Wishlist\App;

class GlobalSettings {
    public function get_global_settings() {
        $default = [
            'enable_wishlist_for'   => 'all_user',
            'default_name'          => 'My Wishlist',
            'exclude'               => 'product',
            'exclude_item'          => [
                ''
            ],
            'for_each_product'      => 'false',
            'guest_wishlist_day'    => '',
            'for_variation_product' => 'true',
            'for_my_account_page'   => 'true',
            'multi_wishlist'        => 'true',
            'cart_wishlist'         => 'true'
        ];

        $global_settings = maybe_unserialize(get_option('ww_global_settings'));

        return $global_settings;
    }

    public function create_global_settings( $request ) {
        return $request;
    }
}
