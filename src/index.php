<?php

use Timber\Timber;
$context = Timber::context();
$context['post'] = new TimberPost();

$args = array('post_type' => 'page', 'name' => 'artistes');
$context['artistes'] = Timber::get_post($args);
$fr_pages = array('edition-2022', 'edition-2021', 'home', 'nous-soutenir', 'mentions-legales-politiques-de-confidentialite');
$en_pages = array('2022-edition', '2021-edition', 'en', 'support-us', 'legal-notices-and-confidentiality-policy');
$context['lang'] =  'fr';

foreach ($fr_pages as $fr_page) {

    if ($fr_page == $context['post']->post_name) {

        $context['lang'] =  'fr';
    }
}

foreach ($en_pages as $en_page) {

    if ($en_page == $context['post']->post_name) {

        $context['lang'] =  '/en';

    }

}

// echo '<script>console.log("$context", ' . json_encode($context['post']) . ');</script>';



Timber::render( array($context['post']->post_name . '.twig', '404.twig'), $context );
