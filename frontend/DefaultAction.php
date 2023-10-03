<?php

namespace WooCommerce_Wishlist\Frontend;

use WooCommerce_Wishlist\Engine\Base;

class DefaultAction extends Base {
    public function __construct() {
        add_shortcode( 'wawl_wishlist_table', [ $this, 'wawl_wishlist_table' ] );
    }

    function wawl_wishlist_table() {
        return '<h1>This is wishlist table!</h1>';
    }
}