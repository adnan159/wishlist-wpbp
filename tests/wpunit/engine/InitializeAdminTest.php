<?php

namespace WooCommerce_Wishlist\Tests\WPUnit;

class InitializeAdminTest extends \Codeception\TestCase\WPTestCase {
	/**
	 * @var string
	 */
	protected $root_dir;

	public function setUp(): void {
		parent::setUp();

		// your set up methods here
		$this->root_dir = dirname( dirname( dirname( __FILE__ ) ) );

		$user_id = $this->factory->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		set_current_screen( 'edit.php' );
	}

	public function tearDown(): void {
		parent::tearDown();
	}

	/**
	 * @test
	 * it should be admin
	 */
	public function it_should_be_admin() {
		add_filter( 'wp_doing_ajax', '__return_false' );
		do_action('plugins_loaded');

		$classes   = array();
		$classes[] = 'WooCommerce_Wishlist\Internals\PostTypes';
		$classes[] = 'WooCommerce_Wishlist\Internals\Shortcode';
		$classes[] = 'WooCommerce_Wishlist\Internals\Transient';
		$classes[] = 'WooCommerce_Wishlist\Integrations\CMB';
		$classes[] = 'WooCommerce_Wishlist\Integrations\Cron';
		$classes[] = 'WooCommerce_Wishlist\Integrations\Template';
		$classes[] = 'WooCommerce_Wishlist\Integrations\Widgets\My_Recent_Posts_Widget';
		$classes[] = 'WooCommerce_Wishlist\Backend\ActDeact';
		$classes[] = 'WooCommerce_Wishlist\Backend\Enqueue';
		$classes[] = 'WooCommerce_Wishlist\Backend\ImpExp';
		$classes[] = 'WooCommerce_Wishlist\Backend\Notices';
		$classes[] = 'WooCommerce_Wishlist\Backend\Pointers';
		$classes[] = 'WooCommerce_Wishlist\Backend\Settings_Page';

		$all_classes = get_declared_classes();
		foreach( $classes as $class ) {
			$this->assertTrue( in_array( $class, $all_classes ) );
		}
	}

	/**
	 * @test
	 * it should be ajax
	 */
	public function it_should_be_admin_ajax() {
		add_filter( 'wp_doing_ajax', '__return_true' );
		do_action('plugins_loaded');

		$classes   = array();
		$classes[] = 'WooCommerce_Wishlist\Ajax\Ajax';
		$classes[] = 'WooCommerce_Wishlist\Ajax\Ajax_Admin';

		$all_classes = get_declared_classes();
		foreach( $classes as $class ) {
			$this->assertTrue( in_array( $class, $all_classes ) );
		}
	}

}
