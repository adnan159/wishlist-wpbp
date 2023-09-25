<?php

/**
 * @package   WooCommerce_Wishlist
 * @author    WebAppick <webappick@gmail.com>
 * @copyright 2023 WebAppick
 * @license   GPL 2.0+
 * @link      http://domain.tld
 *
 * Plugin Name:     WooCommerce Wishlist
 * Plugin URI:      @TODO
 * Description:     @TODO
 * Version:         1.0.0
 * Author:          WebAppick
 * Author URI:      http://domain.tld
 * Text Domain:     woocommerce-wishlist
 * License:         GPL 2.0+
 * License URI:     http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:     /languages
 * Requires PHP:    7.4
 * WordPress-Plugin-Boilerplate-Powered: v3.3.0
 */

// If this file is called directly, abort.
if ( !defined( 'ABSPATH' ) ) {
	die( 'We\'re sorry, but you can not directly access this file.' );
}

define( 'WW_VERSION', '1.0.0' );
define( 'WW_TEXTDOMAIN', 'woocommerce-wishlist' );
define( 'WW_NAME', 'WooCommerce Wishlist' );
define( 'WW_PLUGIN_ROOT', plugin_dir_path( __FILE__ ) );
define( 'WW_PLUGIN_ABSOLUTE', __FILE__ );
define( 'WW_MIN_PHP_VERSION', '7.4' );
define( 'WW_WP_VERSION', '5.3' );
define( 'WW_API_NAME_SPACE', 'wp/wishlist/v1');

add_action(
	'init',
	static function () {
		load_plugin_textdomain( WW_TEXTDOMAIN, false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}
	);

if ( version_compare( PHP_VERSION, WW_MIN_PHP_VERSION, '<=' ) ) {
	add_action(
		'admin_init',
		static function() {
			deactivate_plugins( plugin_basename( __FILE__ ) );
		}
	);
	add_action(
		'admin_notices',
		static function() {
			echo wp_kses_post(
			sprintf(
				'<div class="notice notice-error"><p>%s</p></div>',
				__( '"WooCommerce Wishlist" requires PHP 5.6 or newer.', WW_TEXTDOMAIN )
			)
			);
		}
	);

	// Return early to prevent loading the plugin.
	return;
}

$woocommerce_wishlist_libraries = require WW_PLUGIN_ROOT . 'vendor/autoload.php'; //phpcs:ignore

require_once WW_PLUGIN_ROOT . 'functions/functions.php';
require_once WW_PLUGIN_ROOT . 'functions/debug.php';

// Add your new plugin on the wiki: https://github.com/WPBP/WordPress-Plugin-Boilerplate-Powered/wiki/Plugin-made-with-this-Boilerplate

$requirements = new \Micropackage\Requirements\Requirements(
	'WooCommerce Wishlist',
	array(
		'php'            => WW_MIN_PHP_VERSION,
		'php_extensions' => array( 'mbstring' ),
		'wp'             => WW_WP_VERSION,
		// 'plugins'            => array(
		// array( 'file' => 'hello-dolly/hello.php', 'name' => 'Hello Dolly', 'version' => '1.5' )
		// ),
	)
);

if ( ! $requirements->satisfied() ) {
	$requirements->print_notice();

	return;
}


/**
 * Create a helper function for easy SDK access.
 *
 * @global type $ww_fs
 * @return object
 */
function ww_fs() {
	global $ww_fs;

	if ( !isset( $ww_fs ) ) {
		require_once WW_PLUGIN_ROOT . 'vendor/freemius/wordpress-sdk/start.php';
		$ww_fs = fs_dynamic_init(
			array(
				'id'             => '',
				'slug'           => 'woocommerce-wishlist',
				'public_key'     => '',
				'is_live'        => false,
				'is_premium'     => true,
				'has_addons'     => false,
				'has_paid_plans' => true,
				'menu'           => array(
					'slug' => 'woocommerce-wishlist',
				),
			)
		);

		if ( $ww_fs->is_premium() ) {
			$ww_fs->add_filter(
				'support_forum_url',
				static function ( $wp_org_support_forum_url ) { //phpcs:ignore
					return 'https://your-url.test';
				}
			);
		}
	}

	return $ww_fs;
}

// ww_fs();

// Documentation to integrate GitHub, GitLab or BitBucket https://github.com/YahnisElsts/plugin-update-checker/blob/master/README.md
Puc_v4_Factory::buildUpdateChecker( 'https://github.com/user-name/repo-name/', __FILE__, 'unique-plugin-or-theme-slug' );

if ( ! wp_installing() ) {
	register_activation_hook( WW_TEXTDOMAIN . '/' . WW_TEXTDOMAIN . '.php', array( new \WooCommerce_Wishlist\Backend\ActDeact, 'activate' ) );
	register_deactivation_hook( WW_TEXTDOMAIN . '/' . WW_TEXTDOMAIN . '.php', array( new \WooCommerce_Wishlist\Backend\ActDeact, 'deactivate' ) );
	add_action(
		'plugins_loaded',
		static function () use ( $woocommerce_wishlist_libraries ) {
			new \WooCommerce_Wishlist\Engine\Initialize( $woocommerce_wishlist_libraries );
		}
	);
}
