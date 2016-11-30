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

$doTask = $displayData['doTask'];
$class  = $displayData['class'];
$text   = $displayData['text'];
$group  = $displayData['group'];
?>

<?php if ($group) : ?>
<a href="#" onclick="<?php echo $doTask; ?>" class="dropdown-item">
	<span class="<?php echo trim($class); ?>"></span>
	<?php echo $text; ?>
</a>
<?php else : ?>
<button onclick="<?php echo $doTask; ?>" class="btn btn-sm btn-outline-danger">
	<span class="<?php echo $class; ?>"></span>
	<?php echo $text; ?>
</button>
<?php endif; ?>
