<?php

namespace POKESEL;

use POKESEL\Controllers\AdminController;
// use POKESEL\FrontendController;

class Bootstrap
{
    public function __construct()
    {
        // add_action('init', [new FrontendController(), 'init']);
        add_action('init', [new AdminController(), 'init']);
    }
}
