<?php

namespace WooCommerce_Wishlist\App;

class SingleProductPageSettings {
    public function get_single_product_page_settings() {
        $global_settings = maybe_unserialize(get_option('ww_single_product_page_settings'));

        return $global_settings;
    }

    public function create_single_product_page_settings( $prepared ) {
        $single_product_page_settings_default_value  = maybe_unserialize( get_option('ww_single_product_page_settings') );

        $updated = array_merge( (array) $single_product_page_settings_default_value, $prepared );

        update_option( 'ww_single_product_page_settings', maybe_serialize( $updated ) );

        $updated = maybe_unserialize( get_option('ww_single_product_page_settings'));

        return $updated;
    }
}