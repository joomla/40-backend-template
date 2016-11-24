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
JHtml::_('stylesheet', 'media/vendor/shepherd/css/shepherd-theme-arrows.css');
JHtml::_('script', 'media/vendor/tether/js/tether.min.js');
JHtml::_('script', 'media/vendor/shepherd/js/shepherd.min.js');
JHtml::_('script', $displayData['file']);

$doTask = $displayData['doTask'];
$text   = $displayData['text'];
?>
<button onclick="<?php echo $doTask; ?>" rel="guide" class="btn btn-outline-info btn-sm float-sm-right">
	<span class="icon-question-sign"></span>
	<?php echo $text; ?>
</button>
