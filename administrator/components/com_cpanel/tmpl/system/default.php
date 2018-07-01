<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_admin
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
?>

<div class="com-cpanel-system">
	<?php foreach ($this->links as $name => $links) : ?>
	<div class="com-cpanel-system__category">
		<h4 class="com-cpanel-system__header"><span class="fa fa-<?php echo $link['icon']; ?>"></span><?php echo \Joomla\CMS\Language\Text::_($name); ?></h4>
		<ul class="list-group list-group-flush">
			<?php foreach ($links as $id => $link) : ?>
				<li class="list-group-item">
					<a href="<?php echo $link['link']; ?>"><?php echo JText::_($link['title']); ?></a>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
	<?php endforeach; ?>
</div>


