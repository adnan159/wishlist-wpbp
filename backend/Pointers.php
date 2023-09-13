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

use WooCommerce_Wishlist\Engine\Base;

/**
 * All the WP pointers.
 */
class Pointers extends Base {

	/**
	 * Initialize the Pointers.
	 *
	 * @since 1.0.0
	 * @return void|bool
	 */
	public function initialize() {
		parent::initialize();

		new \PointerPlus( array( 'prefix' => WW_TEXTDOMAIN ) );
		\add_filter( WW_TEXTDOMAIN . '-pointerplus_list', array( $this, 'custom_initial_pointers' ), 10, 2 );
	}

	/**
	 * Add pointers.
	 * Check on https://github.com/wpbp/pointerplus/blob/master/pointerplus.php for examples
	 *
	 * @param array  $pointers The list of pointers.
	 * @param string $prefix   For your pointers.
	 * @since 1.0.0
	 * @return array
	 */
	public function custom_initial_pointers( array $pointers, string $prefix ) {
		return \array_merge(
			$pointers,
			array(
				$prefix . '_contextual_help' => array(
					'selector'   => '.ui-tabs-anchor#ui-id-2',
					'title'      => \__( 'Boilerplate Help', WW_TEXTDOMAIN ),
					'text'       => \__( 'A pointer for help tab.<br>Go to Posts, Pages or Users for other pointers.', WW_TEXTDOMAIN ),
					'edge'       => 'top',
					'align'      => 'left',
					'icon_class' => 'dashicons-welcome-learn-more',
				),
			)
		);
	}

}
