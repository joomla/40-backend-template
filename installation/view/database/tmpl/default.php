<?php
/**
 * @package     Joomla.Installation
 * @subpackage  View
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/* @var InstallationViewDefault $this */
?>
<?php echo JHtml::_('InstallationHtml.helper.stepbar'); ?>
<form action="index.php" method="post" id="adminForm" class="form-validate">
	<h3><?php echo JText::_('INSTL_DATABASE'); ?></h3>
	<hr>
	<div class="row">
		<div class="col-md-11 col-lg-6 container">
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('db_type'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('db_type'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_DATABASE_TYPE_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('db_host'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('db_host'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_DATABASE_HOST_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('db_user'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('db_user'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_DATABASE_USER_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('db_pass'); ?></div>
				<?php // Disables autocomplete ?> <input type="password" style="display:none">
				<div class="col-md-11"><?php echo $this->form->getInput('db_pass'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_DATABASE_PASSWORD_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('db_name'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('db_name'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_DATABASE_NAME_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('db_prefix'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('db_prefix'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_DATABASE_PREFIX_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('db_old'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('db_old'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_DATABASE_OLD_PROCESS_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
		</div>
	</div>
	<ul class="nav nav-tabs nav-justified install-nav-footer">
		<li class="nav-item">
			<a class="nav-button prev-button" href="#" onclick="return Install.goToPage('site');" rel="prev" title="<?php echo JText::_('JPREVIOUS'); ?>"><span class="fa fa-arrow-left"></span> <?php echo JText::_('JPREVIOUS'); ?></a>
		</li>
		<li class="nav-item">
			<a  class="nav-button next-button" href="#" onclick="Install.submitform();" rel="next" title="<?php echo JText::_('JNEXT'); ?>"><span class="fa fa-arrow-right icon-white"></span> <?php echo JText::_('JNEXT'); ?></a>
		</li>
	</ul>
	<input type="hidden" name="task" value="database" />
	<?php echo JHtml::_('form.token'); ?>
</form>
