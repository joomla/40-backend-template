<?php
/**
 * @package     Joomla.Libraries
 * @subpackage  Toolbar
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('JPATH_PLATFORM') or die;

/**
 * Renders a guide button
 *
 * @since  __DEPLOY_VERSION__
 */
class JToolbarButtonGuide extends JToolbarButton
{
	/**
	 * @var    string	Button type
	 */
	protected $_name = 'Guide';

	/**
	 * Fetches the button HTML code.
	 *
	 * @param   string $filePath
	 * @return  string
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function fetchButton($type = 'Guide', $filePath = null)
	{
		// Store all data to the options array for use with JLayout
		$options = array();
		$options['text']   = 'Guide'; //JText::_('JTOOLBAR_HELP');
		$options['doTask'] = 'tour.start();';
		$options['file'] = $filePath;

		// Instantiate a new JLayoutFile instance and render the layout
		$layout = new JLayoutFile('joomla.toolbar.guide');

		return $layout->render($options);
	}

	/**
	 * Get the button id
	 *
	 * Redefined from JButton class
	 *
	 * @return  string	Button CSS Id
	 *
	 * @since   3.0
	 */
	public function fetchId()
	{
		return $this->_parent->getName() . '-guide';
	}
}
