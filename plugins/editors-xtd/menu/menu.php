<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Editors-xtd.menu
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Editor menu buton
 *
 * @since  3.7.0
 */
class PlgButtonMenu extends JPlugin
{
	/**
	 * Load the language file on instantiation.
	 *
	 * @var    boolean
	 * @since  3.7.0
	 */
	protected $autoloadLanguage = true;

	/**
	 * Display the button
	 *
	 * @param   string  $name  The name of the button to add
	 *
	 * @since  3.7.0
	 * @return array
	 */
	public function onDisplay($name)
	{
		/*
		 * Javascript to insert the link
		 * View element calls jSelectMenuItem when a menu item is clicked
		 * jSelectMenuItem creates the link tag, sends it to the editor,
		 * and closes the select frame.
		 */
		$js = "
		function jSelectMenuItem(id, title, tree, object, uri, language)
		{
			var thislang = '';
			if (language !== '')
			{
				var thislang = '&lang=';
			}
			var tag = '<a href=\"' + uri + thislang + language + '\">' + title + '</a>';
			jInsertEditorText(tag, '" . $name . "');
			jModalClose();
		}";

		$doc = JFactory::getDocument();
		$doc->addScriptDeclaration($js);

		/*
		 * Use the built-in element view to select the menu item.
		 * Currently uses blank class.
		 */
		$link = 'index.php?option=com_menus&amp;view=items&amp;layout=modal&amp;tmpl=component&amp;' . JSession::getFormToken() . '=1';

		$button          = new JObject;
		$button->modal   = true;
		$button->link    = $link;
		$button->text    = JText::_('PLG_EDITORS-XTD_MENU_BUTTON_MENU');
		$button->name    = 'share-alt';
		$button->options = array(
			'height' => '300px',
			'width'  => '800px',
			'bodyHeight'  => '70',
			'modalWidth'  => '80',
		);

		return $button;
	}
}
