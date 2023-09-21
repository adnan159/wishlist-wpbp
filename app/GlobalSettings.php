<?php

namespace WooCommerce_Wishlist\App;

class GlobalSettings {
    public function get_global_settings() {
        $global_settings = maybe_unserialize(get_option('ww_global_settings'));

        return $global_settings;
    }

    public function create_global_settings( $prepared ) {
        $global_settings_default_value  = maybe_unserialize( get_option('ww_global_settings') );

        $updated = array_merge( (array) $global_settings_default_value, $prepared );

        update_option( 'ww_global_settings', maybe_serialize( $updated ) );

        $updated = maybe_unserialize( get_option('ww_global_settings'));

        return $updated;
    }
}
