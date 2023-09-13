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

namespace WooCommerce_Wishlist\Engine;

use WooCommerce_Wishlist\Engine;

/**
 * WooCommerce_Wishlist Initializer
 */
class Initialize {

	/**
	 * List of class to initialize.
	 *
	 * @var array
	 */
	public $classes = array();

	/**
	 * Instance of this Context.
	 *
	 * @var object
	 */
	protected $content = null;

	/**
	 * Composer autoload file list.
	 *
	 * @var \Composer\Autoload\ClassLoader
	 */
	private $composer;

	/**
	 * The Constructor that load the entry classes
	 *
	 * @param \Composer\Autoload\ClassLoader $composer Composer autoload output.
	 * @since 1.0.0
	 */
	public function __construct( \Composer\Autoload\ClassLoader $composer ) {
		$this->content  = new Engine\Context;
		$this->composer = $composer;

		$this->get_classes( 'Internals' );
		$this->get_classes( 'Integrations' );

		if ( $this->content->request( 'rest' ) ) {
			$this->get_classes( 'Rest' );
		}

		if ( $this->content->request( 'cli' ) ) {
			$this->get_classes( 'Cli' );
		}

		if ( $this->content->request( 'ajax' ) ) {
			$this->get_classes( 'Ajax' );
		}


		if ( $this->content->request( 'backend' ) ) {
			$this->get_classes( 'Backend' );
		}

		if ( $this->content->request( 'frontend' ) ) {
			$this->get_classes( 'Frontend' );
		}

		$this->load_classes();
	}

	/**
	 * Initialize all the classes.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function load_classes() {
		$this->classes = \apply_filters( 'woocommerce_wishlist_classes_to_execute', $this->classes );

		foreach ( $this->classes as $class ) {
			try {
				$this->initialize_plugin_class( $class );
			} catch ( \Throwable $err ) {
				\do_action( 'woocommerce_wishlist_initialize_failed', $err );

				if ( WP_DEBUG ) {
					throw new \Exception( $err->getMessage() );
				}
			}
		}
	}

	/**
	 * Validate the class and initialize it.
	 *
	 * @param class-string $classtovalidate Class name to validate.
	 * @since 1.0.0
	 * @SuppressWarnings("MissingImport")
	 * @return void
	 */
	private function initialize_plugin_class( $classtovalidate ) {
		$reflection = new \ReflectionClass( $classtovalidate );

		if ( $reflection->isAbstract() ) {
			return;
		}

		$temp = new $classtovalidate;

		if ( !\method_exists( $temp, 'initialize' ) ) {
			return;
		}

		$temp->initialize();
	}

	/**
	 * Based on the folder loads the classes automatically using the Composer autoload to detect the classes of a Namespace.
	 *
	 * @param string $namespacetofind Class name to find.
	 * @since 1.0.0
	 * @return array Return the classes.
	 */
	private function get_classes( string $namespacetofind ) {
		$prefix          = $this->composer->getPrefixesPsr4();
		$classmap        = $this->composer->getClassMap();
		$namespacetofind = 'WooCommerce_Wishlist\\' . $namespacetofind;

		// In case composer has autoload optimized
		if ( isset( $classmap[ 'WooCommerce_Wishlist\\Engine\\Initialize' ] ) ) {
			$classes = \array_keys( $classmap );

			foreach ( $classes as $class ) {
				if ( 0 !== \strncmp( (string) $class, $namespacetofind, \strlen( $namespacetofind ) ) ) {
					continue;
				}

				$this->classes[] = $class;
			}

			return $this->classes;
		}

		$namespacetofind .= '\\';

		// In case composer is not optimized
		if ( isset( $prefix[ $namespacetofind ] ) ) {
			$folder    = $prefix[ $namespacetofind ][0];
			$php_files = $this->scandir( $folder );
			$this->find_classes( $php_files, $folder, $namespacetofind );

			if ( !WP_DEBUG ) {
				\wp_die( \esc_html__( 'WooCommerce Wishlist is on production environment with missing `composer dumpautoload -o` that will improve the performance on autoloading itself.', WW_TEXTDOMAIN ) );
			}

			return $this->classes;
		}

		return $this->classes;
	}

	/**
	 * Get php files inside the folder/subfolder that will be loaded.
	 * This class is used only when Composer is not optimized.
	 *
	 * @param string $folder Path.
	 * @param string $exclude_str Exclude all files whose filename contain this. Defaults to `~`.
	 * @since 1.0.0
	 * @return array List of files.
	 */
	private function scandir( string $folder, string $exclude_str = '~' ) {
		// Also exclude these specific scandir findings.
		$blacklist = array( '..', '.', 'index.php' );
		// Scan for files.
		$temp_files = \scandir( $folder );

		$files = array();

		if ( \is_array( $temp_files ) ) {
			foreach ( $temp_files as $temp_file ) {
				// Only include filenames that DO NOT contain the excluded string and ARE NOT on the scandir result blacklist.
				if (
					\is_string( $exclude_str ) && false !== \mb_strpos( $temp_file, $exclude_str )
					|| $temp_file[0] === '.'
					|| \in_array( $temp_file, $blacklist, true )
				) {
					continue;
				}

				$files[] = $temp_file;
			}
		}

		return $files;
	}

	/**
	 * Load namespace classes by files.
	 *
	 * @param array  $php_files List of files with the Class.
	 * @param string $folder Path of the folder.
	 * @param string $base Namespace base.
	 * @since 1.0.0
	 * @return void
	 */
	private function find_classes( array $php_files, string $folder, string $base ) {
		foreach ( $php_files as $php_file ) {
			$class_name = \substr( $php_file, 0, -4 );
			$path       = $folder . '/' . $php_file;

			if ( \is_file( $path ) ) {
				$this->classes[] = $base . $class_name;

				continue;
			}

			// Verify the Namespace level
			if ( \substr_count( $base . $class_name, '\\' ) < 2 ) {
				continue;
			}

			if ( !\is_dir( $path ) || \strtolower( $php_file ) === $php_file ) {
				continue;
			}

			$sub_php_files = $this->scandir( $folder . '/' . $php_file );
			$this->find_classes( $sub_php_files, $folder . '/' . $php_file, $base . $php_file . '\\' );
		}
	}

}
