<?php

namespace POKESEL\Controllers;

class AdminController
{
    public function init()
    {
        if (!is_admin()) return;

        add_action('admin_menu', [$this, 'createAdminMenu']);
    }

    public function createAdminMenu()
    {
        add_menu_page(__('Pokemon Selector', 'pokesel'), __('Pokemon Selector', 'pokesel'), 'administrator', 'pokemon-selector', [$this, 'createAdminPage'], '', 25);
    }

    public function createAdminPage()
    {
        include(POKESEL_PLUGIN_PATH . 'views/admin/selector-page.php');
    }
}
