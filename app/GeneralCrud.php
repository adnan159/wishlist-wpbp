<?php

namespace WooCommerce_Wishlist\App;

class GeneralCrud {
    public function get_general_settings() {
        return 'General Settings form new Class';
    }

    public function create_general_settings( $request ) {
        error_log(print_r($request, true));
        return $request;
    }
}
