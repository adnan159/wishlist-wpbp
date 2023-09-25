<?php

namespace WooCommerce_Wishlist\App;

class MyWishlistPageSettings {
    public function get_my_wishlist_settings() {
        $my_wishlist_page_settings = maybe_unserialize(get_option('my_wishlist_settings'));

        return $my_wishlist_page_settings;
    }

    public function edit_my_wishlist_settings( $prepared ) {
        $my_wishlist_page_settings  = maybe_unserialize( get_option('my_wishlist_settings') );

        $updated = array_merge( (array) $my_wishlist_page_settings, $prepared );

        update_option( 'my_wishlist_settings', maybe_serialize( $updated ) );

        $updated = maybe_unserialize( get_option('my_wishlist_settings'));

        return $updated;
    }
}
