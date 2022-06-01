<?php

flush_rewrite_rules();

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
  return;
}

Timber::$dirname = array('views', 'views/partials', 'views/layouts');

class WPBoilerplateSite extends TimberSite {
	function __construct() {
		show_admin_bar(false);

		// function theme_add_woocommerce_support() {
		// 	add_theme_support( 'woocommerce' );
		// }

		// add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

		remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_action( 'wp_head', 'rest_output_link_wp_head' );
		remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'index_rel_link' );
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'wp_generator' );

		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );

		add_action( 'init', array( $this, 'add_custom_options_page' ) );
		add_action( 'wp_footer', array( $this, 'deregister_scripts' ) );

		parent::__construct();
	}

	function add_custom_options_page() {
		if ( function_exists('acf_add_options_page') ) {
			acf_add_options_page(array(
				'page_title' 	=> 'SEO',
				'menu_title'	=> 'SEO',
				'menu_slug' 	=> 'seo',
				'capability'	=> 'edit_posts',
				'parent_slug' => 'options-general.php',
				'redirect'		=> false
			));
		}
	}
	function add_to_context( $context ) {
		$context['menu'] = new Timber\Menu();
		$context['site'] = $this;
		// $context['options'] = get_fields('options');
		// $lang = substr($context['site']->language, 0, 2);
		// $context['lang'] = $lang == 'fr' ? '' : '/en';
		return $context;
	}

	function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('translate', new Twig_SimpleFilter('translate', array($this, 'translate')));
		return $twig;
	}

	function translate($text) {
		if (function_exists(wpm_translate_string)) {
			return wpm_translate_string( $text, substr($this->language, 0, 2));
		} else {
			return 'Boilerplate';
		}
	}

	function deregister_scripts() {
 		wp_deregister_script( 'wp-embed' );
	}
}

/**
 * Use specific template for password protected posts.
 *
 * By default, this will use the `password-protected.php` template file. If you want password
 * templates specific to a post type, use `password-protected-$posttype.php`.
 */
add_filter( 'template_include', 'get_password_protected_template', 99 );

function get_password_protected_template( $template ) {
    global $post;

    if ( ! empty( $post ) && post_password_required( $post->ID ) ) {
        $template = locate_template( [
            'password-protected.php',
        ] ) ?: $template;
    }

    return $template;
};

// Use this to determine if WP Multilang needs EN | FR
function id_WPSE_114111() {
	echo "<pre>";
	// var_dump(get_current_screen());
	echo "</pre>";
}

add_action( 'admin_notices', 'id_WPSE_114111' );

// Be sure to have image quality to be 100, and disable WP default compression
add_filter('jpeg_quality', function($arg){return 100;});
add_filter( 'wp_editor_set_quality', function($arg){return 100;} );

// // Use this to determine if WP Multilang needs EN | FR
// function id_WPSE_114111() {
// 	echo "<pre>";
// 	// var_dump(get_current_screen());
// 	echo "</pre>";
// }
// add_action( 'admin_notices', 'id_WPSE_114111' );

// Make sure no images upload exceeds 1MB
function nelio_max_image_size( $file ) {
  $size = $file['size'];
  $size = $size / 1024;
  $type = $file['type'];
  $is_image = strpos( $type, 'image' ) !== false;
  $limit = 2000;
  $limit_output = '2mb';
  if ( $is_image && $size > $limit ) {
    $file['error'] = 'Image files must be smaller than ' . $limit_output;
  }
  return $file;
}
add_filter( 'wp_handle_upload_prefilter', 'nelio_max_image_size' );

new WPBoilerplateSite();

function remove_menu_pages() {
	// remove_menu_page('tools.php');
	// remove_menu_page('edit-comments.php');
	// remove_menu_page('edit.php?post_type=sp_status_update');
	// remove_menu_page('pods');
	// remove_menu_page('edit.php?post_type=acf-field-group'); // Advanced Custom Fields
	// remove_menu_page('users.php');
	// remove_menu_page('plugins.php');
	// // remove_menu_page('appearance.php');
	// remove_menu_page('options-general.php');
	// remove_menu_page('themes.php');
	// remove_menu_page('wpcf7'); // Contact form 7
	// remove_menu_page('wpseo_dashboard'); // SEO by Yoast
}
add_action( 'admin_menu', 'remove_menu_pages' );

function clean_posts_column( $columns ) {
	unset($columns['wpseo-title']);
	unset($columns['comments']);
	unset($columns['tags']);
	unset($columns['categories']);
	unset($columns['author']);
	unset($columns['wpseo-score-readability']);
	unset($columns['wpseo-score']);
    unset($columns['wpseo-metadesc']);
    unset($columns['wpseo-focuskw']);
    return $columns;
}
add_filter( 'manage_edit-post_columns', 'clean_posts_column', 10, 1 );
add_filter( 'manage_edit-page_columns', 'clean_posts_column', 10, 1 );

function wptutsplus_remove_dashboard_widgets() {
	remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_secondary', 'dashboard', 'side' );
	remove_meta_box( 'welcome-panel', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_activity', 'dashboard', 'side' );
	remove_meta_box( 'wpseo-dashboard-overview', 'dashboard', 'side' );
}

add_action( 'wp_dashboard_setup', 'wptutsplus_remove_dashboard_widgets' );

function wpb_custom_query( $query ) {
	if( $query->is_main_query() && $query->is_home() ) {
		// Set parameters to modify the query
		$query->set( 'orderby', 'title' );
		$query->set( 'order', 'ASC' );
		$query->set( 'suppress_filters', 'true' );
	}
}
add_action( 'pre_get_posts', 'wpb_custom_query' );


function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
   }
add_filter('upload_mimes', 'cc_mime_types');
