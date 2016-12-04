<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  HTML
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('JPATH_PLATFORM') or die;

/**
 * Utility class for jQuery JavaScript behaviors
 *
 * @since  3.0
 */
abstract class JHtmlJquery
{
	/**
	 * @var    array  Array containing information for loaded files
	 * @since  3.0
	 */
	protected static $loaded = array();

	/**
	 * Method to load the jQuery JavaScript framework into the document head
	 *
	 * If debugging mode is on an uncompressed version of jQuery is included for easier debugging.
	 *
	 * @param   boolean  $noConflict  True to load jQuery in noConflict mode [optional]
	 * @param   mixed    $debug       Is debugging mode on? [optional]
	 * @param   boolean  $migrate     True to enable the jQuery Migrate plugin
	 *
	 * @return  void
	 *
	 * @since   3.0
	 */
	public static function framework($noConflict = true, $debug = null, $migrate = false)
	{
		// Only load once
		if (!empty(static::$loaded[__METHOD__]))
		{
			return;
		}

		// If no debugging value is set, use the configuration setting
		if ($debug === null)
		{
			$debug = (boolean) JFactory::getConfig()->get('debug');
		}

		// Get CDN plugin parameters
		$plugin   = JPluginHelper::getPlugin('system', 'cdn');
		$params   = new JRegistry($plugin->params);
		$minified = $debug == 1 ? '' : '.min';

		// Get asset version
		JLoader::register('ExternalAssets', JPATH_LIBRARIES . '/cms/helper/assets.php');
		$assets = ExternalAssets::getCoreAssets();

		if ($params->get('jquery', 0) == 0)
		{
			JHtml::_('script', 'vendor/jquery/jquery.min.js', array('version' => 'auto', 'relative' => true, 'detectDebug' => $debug));
		}
		else
		{
			JHtml::_('script', '//code.jquery.com/jquery-' . $assets['jquery']['version'] . $minified . '.js');
		}

		// Check if we are loading in noConflict
		if ($noConflict)
		{
			JHtml::_('script', 'system/jquery-noconflict.min.js', array('version' => 'auto', 'relative' => true));
		}

		// Check if we are loading Migrate
		if ($migrate)
		{
			if ($params->get('jquery', 0) == 0)
			{
				JHtml::_('script', 'vendor/jquery/jquery-migrate.min.js', array('version' => 'auto', 'relative' => true, 'detectDebug' => $debug));
			}
			else
			{
				JHtml::_('script', '//code.jquery.com/jquery-migrate-' . $assets['jquery-migrate']['version'] . $minified . '.js');
			}
		}

		static::$loaded[__METHOD__] = true;

		return;
	}

	/**
	 * Method to load the jQuery UI JavaScript framework into the document head
	 *
	 * If debugging mode is on an uncompressed version of jQuery UI is included for easier debugging.
	 *
	 * @param   array  $components  The jQuery UI components to load [optional]
	 * @param   mixed  $debug       Is debugging mode on? [optional]
	 *
	 * @return  void
	 *
	 * @since   3.0
	 */
	public static function ui(array $components = array('core'), $debug = null)
	{
		// Set an array containing the supported jQuery UI components handled by this method
		$supported = array('core', 'sortable');

		// Include jQuery
		static::framework();

		// If no debugging value is set, use the configuration setting
		if ($debug === null)
		{
			$debug = JDEBUG;
		}

		// Load each of the requested components
		foreach ($components as $component)
		{
			// Only attempt to load the component if it's supported in core and hasn't already been loaded
			if (in_array($component, $supported) && empty(static::$loaded[__METHOD__][$component]))
			{
				JHtml::_('script', 'vendor/jquery-ui/jquery.ui.' . $component . '.min.js', 
					array('version' => 'auto', 'relative' => true, 'detectDebug' => $debug));

				static::$loaded[__METHOD__][$component] = true;
			}
		}

		return;
	}
}
