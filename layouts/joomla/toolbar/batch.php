<?php
/**
 * @package     Joomla.Site
 * @subpackage  Layout
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('JPATH_BASE') or die;

JHtml::_('behavior.core');

$title   = $displayData['title'];
$group   = $displayData['group'];
$message = JText::_('JLIB_HTML_PLEASE_MAKE_A_SELECTION_FROM_THE_LIST');
$message = addslashes($message);
?>

<?php if ($group) : ?>
<a href="#" data-toggle="modal" onclick="if(document.adminForm.boxchecked.value==0){alert('<?php echo $message; ?>');}else{jQuery('#collapseModal').modal('show'); return true;}" class="dropdown-item">
	<span class="icon-checkbox-partial" title="<?php echo $title; ?>"></span>
	<?php echo $title; ?>
</a>
<?php else : ?>
<button data-toggle="modal" onclick="if(document.adminForm.boxchecked.value==0){alert('<?php echo $message; ?>');}else{jQuery('#collapseModal').modal('show'); return true;}" class="btn btn-outline-primary btn-sm">
	<span class="icon-checkbox-partial" title="<?php echo $title; ?>"></span>
	<?php echo $title; ?>
</button>
<?php endif; ?>
