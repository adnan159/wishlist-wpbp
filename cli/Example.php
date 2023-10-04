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

namespace WooCommerce_Wishlist\Cli;

use WooCommerce_Wishlist\Engine\Base;

if ( \defined( 'WP_CLI' ) && WP_CLI ) {

	/**
	 * WP CLI command example
	 */
	class Example extends Base {

		/**
		 * Initialize the commands
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			\WP_CLI::add_command( 'ww_commandname', array( $this, 'command_example' ) );
		}

		/**
		 * Initialize the class.
		 *
		 * @return void|bool
		 */
		public function initialize() {
			if ( !\apply_filters( 'woocommerce_wishlist_ww_enqueue_admin_initialize', true ) ) {
				return;
			}

			parent::initialize();
		}

		/**
		 * Example command
		 * API reference: https://wp-cli.org/docs/internal-api/
		 *
		 * @since 1.0.0
		 * @param array $args The attributes.
		 * @return void
		 */
		public function command_example( array $args ) {
			// Message prefixed with "Success: ".
			\WP_CLI::success( $args[0] );
			// Message prefixed with "Warning: ".
			\WP_CLI::warning( $args[0] );
			// Message prefixed with "Debug: ". when '--debug' is used
			\WP_CLI::debug( $args[0] );
			// Message prefixed with "Error: ".
			// \WP_CLI::error( $args[0] );
			// Message with no prefix
			\WP_CLI::log( $args[0] );
			// Colorize a string for output
			\WP_CLI::colorize( $args[0] );
			// Halt script execution with a specific return code
			\WP_CLI::halt( $args[0] );
		}

	}

}
