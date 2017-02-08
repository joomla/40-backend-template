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
 * Utility class for Joomla Custom Elements.
 *
 * @since  4.0
 */
abstract class JHtmlJui
{
	/**
	 * @var    array  Array containing information for loaded files
	 * @since  4.0
	 */
	protected static $loaded = array();

	/**
	 * Add Joomla Custom Element: dropdown
	 *
	 * @return  void
	 *
	 * @since   4.0
	 */
	public static function dropdown()
	{
		// Only load once
		if (isset(static::$loaded[__METHOD__]))
		{
			return;
		}

		// Include Joomla Custom Elements framework
		JHtml::_('jui.framework');

		static::$loaded[__METHOD__] = true;

		JFactory::getDocument()->addCustomTag('<link rel="import" href="' . JUri::root(true) . '/media/jui/custom-elements/b-dropdown.html">');
	}

	/**
	 * Method to load the Joomla Custom Elements JavaScript framework into the document head
	 *
	 * @return  void
	 *
	 * @since   4.0
	 */
	public static function framework()
	{
		// Only load once
		if (!empty(static::$loaded[__METHOD__]))
		{
			return;
		}

		JHtml::_('script', 'jui/custom-elements/webcomponents-lite.min.js', array('version' => 'auto', 'relative' => true));
		JHtml::_('script', 'jui/custom-elements/bosonic-runtime.js', array('version' => 'auto', 'relative' => true));
		static::$loaded[__METHOD__] = true;
	}

	/**
	 * Add Joomla Custom Element: tabs
	 *
	 * @return  void
	 *
	 * @since   4.0
	 */
	public static function tabs()
	{
		// Only load once
		if (isset(static::$loaded[__METHOD__]))
		{
			return;
		}

		// Include Joomla Custom Elements framework
		JHtml::_('jui.framework');

		static::$loaded[__METHOD__] = true;

		JFactory::getDocument()->addCustomTag('<link rel="import" href="' . JUri::root(true) . '/media/jui/custom-elements/b-tabs.html">');
	}

	/**
	 * Add Joomla Custom Element: accordion
	 *
	 * @return  void
	 *
	 * @since   4.0
	 */
	public static function accordion()
	{
		// Only load once
		if (isset(static::$loaded[__METHOD__]))
		{
			return;
		}

		// Include Joomla Custom Elements framework
		JHtml::_('jui.framework');

		static::$loaded[__METHOD__] = true;

		JFactory::getDocument()->addCustomTag('<link rel="import" href="' . JUri::root(true) . '/media/jui/custom-elements/b-accordion.html">');
	}
}
