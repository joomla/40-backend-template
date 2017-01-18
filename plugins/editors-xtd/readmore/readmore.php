<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Editors-xtd.readmore
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Editor Readmore button
 *
 * @since  1.5
 */
class PlgButtonReadmore extends JPlugin
{
	/**
	 * Load the language file on instantiation.
	 *
	 * @var    boolean
	 * @since  3.1
	 */
	protected $autoloadLanguage = true;

	/**
	 * Readmore button
	 *
	 * @param   string   $name    The name of the button to add
	 *
	 * @return  JObject  $button  A two element array of (imageName, textToInsert)
	 *
	 * @since   1.5
	 */
	public function onDisplay($name)
	{
		$getContent = $this->_subject->getContent($name);
		$present    = JText::_('PLG_READMORE_ALREADY_EXISTS', true);
		$js = "
			function insertReadmore(editor)
			{
				var content = $getContent
				if (content.match(/<hr\s+id=(\"|')system-readmore(\"|')\s*\/*>/i))
				{
					alert('$present');
					return false;
				} else {
					jInsertEditorText('<hr id=\"system-readmore\" />', editor);
				}
			}
			";
		JFactory::getDocument()->addScriptDeclaration($js);

		$button = new JObject;
		$button->modal   = false;
		$button->class   = 'btn btn-secondary';
		$button->onclick = 'insertReadmore(\'' . $name . '\');return false;';
		$button->text    = JText::_('PLG_READMORE_BUTTON_READMORE');
		$button->name    = 'arrow-down';
		$button->link    = '#';

		return $button;
	}
}
