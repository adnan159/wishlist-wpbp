<?php

namespace WooCommerce_Wishlist\Frontend;

use WooCommerce_Wishlist\Engine\Base;

/**
 * ProductListing class extending the Base class for WooCommerce product listing functionality.
 */
class ProductListing extends Base {
    /**
     * Constructor for the ProductListing class.
     * Adds an action to display an icon inside product images.
     */
    public function __construct() {
        add_action('woocommerce_before_shop_loop_item_title', [ $this, 'add_icon_inside_product_image' ] );
    }

    /**
     * Displays an icon inside product images on the WooCommerce shop page.
     * The icon is positioned with CSS and styled accordingly.
     */
    public function add_icon_inside_product_image() {
        echo '<div class="product-icon" style="position: absolute;
                top: 10px; /* Adjust the position based on your design */
                left: 90%; /* Adjust the position based on your design */
                z-index: 20;
                color: #f4a2a2; /* Adjust the icon color based on your design */
                font-size: 24px;">
                    <i class="fas fa-heart"></i>
               </div>';
    }
}
