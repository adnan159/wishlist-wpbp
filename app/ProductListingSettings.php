<?php

namespace WooCommerce_Wishlist\App;

class ProductListingSettings {

    public function get_product_listing_settings() {
        $product_listing_settings = maybe_unserialize(get_option('ww_product_listing_settings'));

        return $product_listing_settings;
    }


    public function create_product_listing_settings( $prepared ) {
        $listing_settings_default_value  = maybe_unserialize( get_option('ww_product_listing_settings') );

        $updated = array_merge( (array) $listing_settings_default_value, $prepared );

        update_option( 'ww_product_listing_settings', maybe_serialize( $updated ) );

        $updated = maybe_unserialize( get_option('ww_product_listing_settings'));

        return $updated;
    }

}
