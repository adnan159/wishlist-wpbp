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

namespace WooCommerce_Wishlist\Frontend;

use Inpsyde\Assets\Asset;
use Inpsyde\Assets\AssetManager;
use Inpsyde\Assets\Script;
use Inpsyde\Assets\Style;
use WooCommerce_Wishlist\Engine\Base;

/**
 * Enqueue stuff on the frontend
 */
class Enqueue extends Base {

	/**
	 * Initialize the class.
	 *
	 * @return void|bool
	 */
	public function initialize() {
		parent::initialize();

		\add_action( AssetManager::ACTION_SETUP, array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Enqueue assets with Inpyside library https://inpsyde.github.io/assets
	 *
	 * @param \Inpsyde\Assets\AssetManager $asset_manager The class.
	 * @return void
	 */
	public function enqueue_assets( AssetManager $asset_manager ) {
		// Load public-facing style sheet and JavaScript.
		$assets = $this->enqueue_styles();

		if ( !empty( $assets ) ) {
			foreach ( $assets as $asset ) {
				$asset_manager->register( $asset );
			}
		}

		$assets = $this->enqueue_scripts();

		if ( !empty( $assets ) ) {
			foreach ( $assets as $asset ) {
				$asset_manager->register( $asset );
			}
		}

	}

	/**
	 * Register and enqueue public-facing style sheet.
	 *
	 * @since 1.0.0
	 * @return array
	 */
	public function enqueue_styles() {
		$styles = array();
		$styles[0] = new Style( WW_TEXTDOMAIN . '-plugin-styles', \plugins_url( 'assets/build/plugin-public.css', WW_PLUGIN_ABSOLUTE ) );
		$styles[0]->forLocation( Asset::FRONTEND )->useAsyncFilter()->withVersion( WW_VERSION );
		$styles[0]->dependencies();

		return $styles;
	}


	/**
	 * Register and enqueues public-facing JavaScript files.
	 *
	 * @since 1.0.0
	 * @return array
	 */
	public static function enqueue_scripts() {
		$scripts = array();
		$scripts[0] = new Script( WW_TEXTDOMAIN . '-plugin-script', \plugins_url( 'assets/build/plugin-public.js', WW_PLUGIN_ABSOLUTE ) );
		$scripts[0]->forLocation( Asset::FRONTEND )->useAsyncFilter()->withVersion( WW_VERSION );
		$scripts[0]->dependencies();
		$scripts[0]->withLocalize(
			'exampleDemo',
			array(
				'alert'   => \__( 'Error!', WW_TEXTDOMAIN ),
				'nonce'   => \wp_create_nonce( 'demo_example' ),
				'wp_rest' => \wp_create_nonce( 'wp_rest' ),
			)
		);


		return $scripts;
	}


}
