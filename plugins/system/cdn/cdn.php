<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  System.cdn
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// @TODO Run thru the styles array and replace the bootstrap css if is needed
defined('_JEXEC') or die;

/**
 * Joomla! CDN plugin.
 *
 * @since  __DEPLOY_VERSION__
 */
class PlgSystemCdn extends JPlugin
{
	/**
	 * Replace local scripts with CDN versions
	 *
	 * @return  void
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function onBeforeCompileHead()
	{
		$app       = JFactory::getApplication();
		$doc       = $app->getDocument();
		$jquery    = false;
		$bootstrap = false;

		// Should jquery being served from CDN?
		if ($this->params->get('jquery', 0) === 1)
		{
			$jquery = true;
		}

		// Should jquery being served from CDN?
		if ($this->params->get('bootstrap', 0) === 1)
		{
			$bootstrap = true;
		}

		// Early return
		if (($jquery === false && $bootstrap === false) || $doc->getType() !== 'html')
		{
			return;
		}



		// Get the debug specific ext
		$debug = $app->get('debug', 0);
		$minified = $debug == 1 ? '' : '.min';

		// Get the document scripts
		$scripts = JFactory::getDocument()->_scripts;

		// Get asset version
		$assets = JHelperAssets::getCoreAssets();

		// An array for the modified scripts
		$tempArray = [];

		// Root path
		$path = JUri::root(true);

		// Reset $doc->_scripts and build, with any replacements, the $tempArray
		foreach ($scripts as $script => $options)
		{
			// Keep a reference of the old script,path
			$oldRef = $script;

			if ($jquery === true)
			{
				if ($script === $path . '/media/vendor/jquery/js/jquery' . $minified . '.js')
				{
					$script = 'https://code.jquery.com/jquery-' . $assets['jquery']['version'] . $minified . '.js';
					$options = [];
				}

				if ($script === $path . '/media/vendor/jquery/js/jquery-migrate' . $minified . '.js')
				{
					$script = 'https://code.jquery.com/jquery-migrate-' . $assets['jquery-migrate']['version'] . $minified . '.js';
					$options = [];
				}
			}

			if ($bootstrap === true)
			{
				if ($script === $path . '/media/vendor/tether/js/tether' . $minified . '.js')
				{
					$script = 'https://cdnjs.cloudflare.com/ajax/libs/tether/' . $assets['tether']['version'] . '/js/tether' . $minified . '.js';
					$options = [];
				}

				if ($script === $path . '/media/vendor/bootstrap/js/bootstrap' . $minified . '.js')
				{
					$script = 'https://maxcdn.bootstrapcdn.com/bootstrap/'
						. str_replace('~', '', $assets['bootstrap']['version'])
						. '/js/bootstrap' . $minified . '.js';
					$options = [];
				}
			}

			$tempArray[$script] = $options;

			// Unset this script
			unset($doc->_scripts[$oldRef]);
		}

		// Re assign the scripts to the document
		$doc->_scripts = $tempArray;
	}
}

