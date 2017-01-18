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
<form action="index.php" method="post" id="languageForm">
	<div class="row">
		<div class="col-md-11 col-lg-6 container">
			<div class="form-group">
				<label for="jform_language"><?php echo JText::_('INSTL_SELECT_LANGUAGE_TITLE'); ?></label>
				<?php echo $this->form->getInput('language'); ?>
			</div>
			<input type="hidden" name="task" value="setlanguage" />
			<?php echo JHtml::_('form.token'); ?>
		</div>
	</div>
</form>
<form action="index.php" method="post" id="adminForm" class="form-validate">
	<h3><?php echo JText::_('INSTL_SITE'); ?></h3>
	<hr>
	<div class="row">
		<div class="col-md-11 col-lg-6 container">
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('site_name'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('site_name'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_SITE_NAME_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('site_metadesc'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('site_metadesc'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-trigger="hover" data-content="<?php echo JText::_('INSTL_SITE_METADESC_TITLE_LABEL'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('site_offline'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('site_offline'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-trigger="hover" data-content="<?php echo JText::_('INSTL_SITE_OFFLINE_TITLE_LABEL'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('admin_email'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('admin_email'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_ADMIN_EMAIL_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('admin_user'); ?></div>
				<div class="col-md-11"><?php echo $this->form->getInput('admin_user'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_ADMIN_USER_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('admin_password'); ?></div>
				<?php // Disables autocomplete ?> <input type="password" style="display:none">
				<div class="col-md-11"><?php echo $this->form->getInput('admin_password'); ?></div>
				<div class="col-md-1">
					<a class="hasPopover text-muted" data-toggle="popover" data-content="<?php echo JText::_('INSTL_ADMIN_PASSWORD_DESC'); ?>"><i class="fa fa-question-circle"></i></a>
				</div>
			</div>
			<div class="form-group row align-items-center">
				<div class="col-md-12"><?php echo $this->form->getLabel('admin_password2'); ?></div>
				<?php // Disables autocomplete ?> <input type="password" style="display:none">
				<div class="col-md-11"><?php echo $this->form->getInput('admin_password2'); ?></div>
			</div>
		</div>
	</div>
	<ul class="nav nav-tabs nav-justified install-nav-footer">
		<li class="nav-item">
			<a class="nav-button prev-button disabled" rel="prev" title="<?php echo JText::_('JPREVIOUS'); ?>"><span class="fa fa-arrow-left"></span> <?php echo JText::_('JPREVIOUS'); ?></a>
		</li>
		<li class="nav-item">
			<a class="nav-button next-button" href="#" onclick="Install.submitform();" rel="next" title="<?php echo JText::_('JNEXT'); ?>"><span class="fa fa-arrow-right icon-white"></span> <?php echo JText::_('JNEXT'); ?></a>
		</li>
	</ul>
	<input type="hidden" name="task" value="site" />
	<?php echo JHtml::_('form.token'); ?>
</form>
