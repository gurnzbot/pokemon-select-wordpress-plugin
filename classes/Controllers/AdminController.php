<?php

namespace POKESEL\Controllers;

class AdminController
{
    public function init()
    {
        if (!is_admin()) return;

        add_action('admin_menu', [$this, 'createAdminMenu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminScripts']);
    }

    public function createAdminMenu()
    {
        add_menu_page(
            __('Pokemon Selector', 'pokesel'),
            __('Pokemon Selector', 'pokesel'),
            'administrator',
            'pokemon-selector',
            [$this, 'createAdminPage'],
            '',
            25
        );
    }

    public function createAdminPage()
    {
        include(POKESEL_PLUGIN_PATH . 'views/admin/selector-page.php');
    }

    public function enqueueAdminScripts()
    {
        wp_enqueue_style('pokesel_admin_styles', plugins_url('/assets/dist/css/admin.min.css', POKESEL_ENTRY_POINT), [], filemtime(POKESEL_PLUGIN_PATH . '/assets/dist/css/admin.min.css'));
        wp_enqueue_script('pokesel_admin_scripts', plugins_url('/assets/dist/js/pokesel-admin.min.js', POKESEL_ENTRY_POINT), ['jquery'], filemtime(POKESEL_PLUGIN_PATH . '/assets/dist/js/pokesel-admin.min.js'), true);
    }
}
