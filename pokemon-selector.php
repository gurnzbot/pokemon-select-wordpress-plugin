<?php

/*******************************************************************************
Plugin Name: Pokemon Selector
Description: Administrators can select pokemon from the PokeAPI (https://pokeapi.co/docs/v2).  Pokemon can then be displayed via a shortcode.
Author: Erik Gurney
Version: 1.0.0
Text Domain: pokesel
 *******************************************************************************/
if (!defined('ABSPATH')) die("No Direct Access");

if (file_exists(dirname(__FILE__) . "/vendor/autoload.php")) {
    require_once dirname(__FILE__) . "/vendor/autoload.php";
}

use POKESEL\Bootstrap;

define('PLUGIN_BASENAME', plugin_basename(__FILE__));
define('POKESEL_PLUGIN_URL', plugin_dir_url(__FILE__));
define('POKESEL_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('POKESEL_ENTRY_POINT', POKESEL_PLUGIN_PATH . 'pokemon-selector.php');

define('POKESEL_DOMAIN', 'POKESEL');

new Bootstrap();
