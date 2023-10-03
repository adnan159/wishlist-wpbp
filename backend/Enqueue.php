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

namespace WooCommerce_Wishlist\Backend;

use Inpsyde\Assets\Asset;
use Inpsyde\Assets\AssetManager;
use Inpsyde\Assets\Script;
use Inpsyde\Assets\Style;
use WooCommerce_Wishlist\Engine\Base;

/**
 * This class contain the Enqueue stuff for the backend
 */
class Enqueue extends Base {

	/**
	 * Initialize the class.
	 *
	 * @return void|bool
	 */
	public function initialize() {
		if ( !parent::initialize() ) {
			return;
		}

		\add_action( AssetManager::ACTION_SETUP, array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Enqueue assets with Inpyside library https://inpsyde.github.io/assets
	 *
	 * @param \Inpsyde\Assets\AssetManager $asset_manager The class.
	 * @return void
	 */
	public function enqueue_assets( AssetManager $asset_manager ) {
		// Load admin style sheet and JavaScript.
		$assets = $this->enqueue_admin_styles();

		if ( !empty( $assets ) ) {
			foreach ( $assets as $asset ) {
				$asset_manager->register( $asset );
			}
		}

		$assets = $this->enqueue_admin_scripts();

		if ( !empty( $assets ) ) {
			foreach ( $assets as $asset ) {
				$asset_manager->register( $asset );
			}
		}

	}

	/**
	 * Register and enqueue admin-specific style sheet.
	 *
	 * @since 1.0.0
	 * @return array
	 */
	public function enqueue_admin_styles() {
		$admin_page = \get_current_screen();
		$styles     = array();

		if ( !\is_null( $admin_page ) && 'toplevel_page_woocommerce-wishlist' === $admin_page->id ) {
			$styles[0] = new Style( WW_TEXTDOMAIN . '-settings-style', \plugins_url( 'assets/build/plugin-settings.css', WW_PLUGIN_ABSOLUTE ) );
			$styles[0]->forLocation( Asset::BACKEND )->withVersion( WW_VERSION );
			$styles[0]->withDependencies( 'dashicons' );
		}

		$styles[1] = new Style( WW_TEXTDOMAIN . '-admin-style', \plugins_url( 'assets/build/plugin-admin.css', WW_PLUGIN_ABSOLUTE ) );
		$styles[1]->forLocation( Asset::BACKEND )->withVersion( WW_VERSION );
		$styles[1]->withDependencies( 'dashicons' );
        $styles[2] = new Style( WW_TEXTDOMAIN . '-admin-tailwind-style', \plugins_url( 'backend/views/asset/tailwind.css', WW_PLUGIN_ABSOLUTE ) );
        $styles[2]->forLocation( Asset::BACKEND )->withVersion( WW_VERSION );
        $styles[2]->withDependencies( 'dashicons' );

		return $styles;
	}

	/**
	 * Register and enqueue admin-specific JavaScript.
	 *
	 * @since 1.0.0
	 * @return array
	 */
	public function enqueue_admin_scripts() {
		$admin_page = \get_current_screen();
		$scripts    = array();

		if ( !\is_null( $admin_page ) && 'toplevel_page_woocommerce-wishlist' === $admin_page->id ) {
			$scripts[0] = new Script( WW_TEXTDOMAIN . '-settings-script', \plugins_url( 'assets/build/plugin-settings.js', WW_PLUGIN_ABSOLUTE ) );
			$scripts[0]->forLocation( Asset::BACKEND )->withVersion( WW_VERSION );
			$scripts[0]->withDependencies( 'jquery-ui-tabs' );
			$scripts[0]->canEnqueue(
				function() {
					return \current_user_can( 'manage_options' );
				}
			);
		}

		$scripts[1] = new Script( WW_TEXTDOMAIN . '-settings-admin', \plugins_url( 'assets/build/plugin-admin.js', WW_PLUGIN_ABSOLUTE ) );
		$scripts[1]->forLocation( Asset::BACKEND )->withVersion( WW_VERSION );
		$scripts[1]->dependencies();

        $js_options = array(
            'ww_ajax_url' => admin_url('admin-ajax.php'),
            'admin_url' => admin_url('admin.php'),
            'json_url' => esc_url_raw(rest_url()),
            'rest_nonce' => wp_create_nonce('wp_rest'),
            'base_rest_url'  => rest_url(WW_API_NAME_SPACE)
        );

        wp_enqueue_script( 'ww-admin-view', 'ww-admin-view.js', [], null, true );

        wp_localize_script( 'ww-admin-view', 'ww_admin_view_object', $js_options );

		return $scripts;
	}

}
