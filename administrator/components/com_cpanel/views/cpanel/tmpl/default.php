<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_cpanel
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\Registry\Registry;

$user = JFactory::getUser();
JHtml::_('script', 'vendor/dragula/dragula.min.js', false, true);
JHtml::_('stylesheet', 'vendor/dragula/dragula.min.css', array(), true);

JFactory::getDocument()->addScriptDeclaration(
<<<JS
		document.addEventListener('DOMContentLoaded', function() {

	var container = document.querySelector('.js-draggable');

	var sortableTable = dragula([container]);

});

JS
);
?>
<div class="row">
	<?php $iconmodules = JModuleHelper::getModules('icon');
	if ($iconmodules) : ?>
		<div class="col-md-3">
			<div class="cpanel-links">
				<?php
				// Display the submenu position modules
				foreach ($iconmodules as $iconmodule)
				{
					echo JModuleHelper::renderModule($iconmodule);
				}
				?>
			</div>
		</div>
	<?php endif; ?>
	<?php if ($user->authorise('core.manage', 'com_postinstall') && $this->postinstall_message_count) : ?>
		<div class="row">
			<div class="col-md-12">
				<div class="alert alert-info">
					<h4>
						<?php echo JText::_('COM_CPANEL_MESSAGES_TITLE'); ?>
					</h4>
					<p>
						<?php echo JText::_('COM_CPANEL_MESSAGES_BODY_NOCLOSE'); ?>
					</p>
					<p>
						<?php echo JText::_('COM_CPANEL_MESSAGES_BODYMORE_NOCLOSE'); ?>
					</p>
					<p>
						<a href="index.php?option=com_postinstall&amp;eid=700" class="btn btn-primary">
							<?php echo JText::_('COM_CPANEL_MESSAGES_REVIEW'); ?>
						</a>
					</p>
				</div>
			</div>
		</div>
	<?php endif; ?>
	<div class="js-draggable col-md-<?php echo ($iconmodules) ? 9 : 12; ?>">
			<?php
			$cols = 0;

			foreach ($this->modules as $module)
			{
				// Get module parameters
				$params = new Registry;
				$params->loadString($module->params);
				$bootstrapSize = $params->get('bootstrap_size', 6);

				echo JModuleHelper::renderModule($module, array('style' => 'well'));
			}
			?>
	</div>
</div>
