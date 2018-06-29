<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_installer
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

$state    = $this->get('State');
$message1 = $state->get('message');
$message2 = $state->get('extension_message');
?>

<?php if ($message1) : ?>
	<div class="container-fluid">
		<div class="col-md-12">
			<strong><?php echo $message1; ?></strong>
		</div>
	</div> 
<?php endif; ?> 
<?php if ($message2) : ?> 
	<div class="container-fluid">
		<div class="col-md-12">
			<?php echo $message2; ?>
		</div> 
	</div>
<?php endif; ?>
