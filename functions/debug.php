<?php
/**
 * WooCommerce_Wishlist
 *
 * @package   WooCommerce_Wishlist
 * @author    WebAppick <webappick@gmail.com>
 * @copyright 2023 WebAppick
 * @license   GPL 2.0+
 * @link      http://domain.tld
 */

$ww_debug = new WPBP_Debug( __( 'WooCommerce Wishlist', WW_TEXTDOMAIN ) );

/**
 * Log text inside the debugging plugins.
 *
 * @param string $text The text.
 * @return void
 */
function ww_log( string $text ) {
	global $ww_debug;
	$ww_debug->log( $text );
}
