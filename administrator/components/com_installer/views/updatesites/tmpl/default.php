<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_installer
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JHtml::_('behavior.multiselect');

JHtml::_('bootstrap.tooltip');

$listOrder = $this->escape($this->state->get('list.ordering'));
$listDirn  = $this->escape($this->state->get('list.direction'));
?>
<div id="installer-manage" class="clearfix">
	<form class="js-multiselect" action="<?php echo JRoute::_('index.php?option=com_installer&view=updatesites'); ?>" method="post" name="adminForm" id="adminForm">
		<div id="j-main-container">
			<?php echo JLayoutHelper::render('joomla.searchtools.default', array('view' => $this)); ?>
			<div class="clearfix"></div>
			<?php if (empty($this->items)) : ?>
			<div class="alert alert-warning alert-no-items">
				<?php echo JText::_('JGLOBAL_NO_MATCHING_RESULTS'); ?>
			</div>
			<?php else : ?>
			<table class="table table-striped">
				<thead>
					<tr>
						<th width="1%" class="text-xs-center">
							<?php echo JHtml::_('grid.checkall'); ?>
						</th>
						<th width="1%" class="nowrap text-xs-center">
							<?php echo JHtml::_('searchtools.sort', 'JSTATUS', 'enabled', $listDirn, $listOrder); ?>
						</th>
						<th class="nowrap">
							<?php echo JHtml::_('searchtools.sort', 'COM_INSTALLER_HEADING_UPDATESITE_NAME', 'update_site_name', $listDirn, $listOrder); ?>
						</th>
						<th class="nowrap hidden-sm-down">
							<?php echo JHtml::_('searchtools.sort', 'COM_INSTALLER_HEADING_NAME', 'name', $listDirn, $listOrder); ?>
						</th>
						<th class="hidden-sm-down">
							<?php echo JHtml::_('searchtools.sort', 'COM_INSTALLER_HEADING_LOCATION', 'client_translated', $listDirn, $listOrder); ?>
						</th>
						<th class="hidden-sm-down">
							<?php echo JHtml::_('searchtools.sort', 'COM_INSTALLER_HEADING_TYPE', 'type_translated', $listDirn, $listOrder); ?>
						</th>
						<th class="hidden-sm-down">
							<?php echo JHtml::_('searchtools.sort', 'COM_INSTALLER_HEADING_FOLDER', 'folder_translated', $listDirn, $listOrder); ?>
						</th>
						<th width="1%" class="nowrap hidden-sm-down">
							<?php echo JHtml::_('searchtools.sort', 'JGRID_HEADING_ID', 'update_site_id', $listDirn, $listOrder); ?>
						</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td colspan="8">
							<?php echo $this->pagination->getListFooter(); ?>
						</td>
					</tr>
				</tfoot>
				<tbody>
				<?php foreach ($this->items as $i => $item) : ?>
					<tr class="row<?php echo $i % 2; if ($item->enabled == 2) echo ' protected'; ?>">
						<td class="text-xs-center">
							<?php echo JHtml::_('grid.id', $i, $item->update_site_id); ?>
						</td>
						<td class="text-xs-center">
							<?php if (!$item->element) : ?>
								<strong>X</strong>
							<?php else : ?>
								<?php echo JHtml::_('InstallerHtml.Updatesites.state', $item->enabled, $i, $item->enabled < 2, 'cb'); ?>
							<?php endif; ?>
						</td>
						<td>
							<label for="cb<?php echo $i; ?>">
								<?php echo JText::_($item->update_site_name); ?>
								<br />
								<span class="small break-word">
									<a href="<?php echo $item->location; ?>" target="_blank"><?php echo $this->escape($item->location); ?></a>
								</span>
							</label>
						</td>
						<td class="hidden-sm-down">
							<span class="bold hasTooltip" title="<?php echo JHtml::tooltipText($item->name, $item->description, 0); ?>">
								<?php echo $item->name; ?>
							</span>
						</td>
						<td class="hidden-sm-down">
							<?php echo $item->client_translated; ?>
						</td>
						<td class="hidden-sm-down">
							<?php echo $item->type_translated; ?>
						</td>
						<td class="hidden-sm-down">
							<?php echo $item->folder_translated; ?>
						</td>
						<td class="hidden-sm-down">
							<?php echo $item->update_site_id; ?>
						</td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
			<?php endif; ?>
			<input type="hidden" name="task" value="" />
			<input type="hidden" name="boxchecked" value="0" />
			<?php echo JHtml::_('form.token'); ?>
		</div>
	</form>
</div>
