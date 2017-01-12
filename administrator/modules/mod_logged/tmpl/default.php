<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  mod_logged
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::_('bootstrap.tooltip');
?>
<ul class="list-group list-group-flush">
	<?php foreach ($users as $user) : ?>
		<li class="list-group-item">
			<div class="row">
				<div class="col-md-6">
					<?php if ($user->client_id == 0) : ?>
						<a title="<?php echo JHtml::tooltipText('MOD_LOGGED_LOGOUT'); ?>" href="<?php echo $user->logoutLink; ?>" class="btn btn-danger btn-xs hasTooltip">
							<span class="icon-remove icon-white" title="<?php echo JText::_('JLOGOUT'); ?>"></span>
						</a>
					<?php endif; ?>

					<strong class="row-title">
						<?php if (isset($user->editLink)) : ?>
							<a href="<?php echo $user->editLink; ?>" class="hasTooltip" title="<?php echo JHtml::tooltipText('JGRID_HEADING_ID'); ?> : <?php echo $user->id; ?>">
								<?php echo $user->name; ?></a>
						<?php else : ?>
							<?php echo $user->name; ?>
						<?php endif; ?>
					</strong>

					<small class="small hasTooltip" title="<?php echo JHtml::tooltipText('JCLIENT'); ?>">
						<?php if ($user->client_id === null) : ?>
							<?php // Don't display a client ?>
						<?php elseif ($user->client_id) : ?>
							<?php echo JText::_('JADMINISTRATION'); ?>
						<?php else : ?>
							<?php echo JText::_('JSITE'); ?>
						<?php endif; ?>
					</small>
				</div>
				<div class="col-md-6 text-sm-right">
					<span class="badge badge-default badge-pill float-right hasTooltip" title="<?php echo JHtml::tooltipText('MOD_LOGGED_LAST_ACTIVITY'); ?>">
						<span class="small">
							<span class="icon-calendar"></span>
							<?php echo JHtml::_('date', $user->time, JText::_('DATE_FORMAT_LC5')); ?>
						</span>
					</span>
				</div>
			</div>
		</li>
	<?php endforeach; ?>
</ul>
