<?php

namespace WooCommerce_Wishlist\Frontend;

use WooCommerce_Wishlist\Engine\Base;

class ProducListing extends Base {
    public function __construct() {
        add_action('woocommerce_before_shop_loop_item_title', [ $this, 'add_icon_inside_product_image'] );
    }

    function add_icon_inside_product_image() {
        echo '<div class="product-icon" style="position: absolute;
                top: 10px; /* Adjust the position based on your design */
                left: 90%; /* Adjust the position based on your design */
                z-index: 1;
                color: #ff0000; /* Adjust the icon color based on your design */
                font-size: 24px;">
                    <i class="fas fa-heart"></i>
               </div>';
    }
}