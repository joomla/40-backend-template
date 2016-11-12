<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Atum
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @since       4.0
 */

defined('_JEXEC') or die;

$app             = JFactory::getApplication();
$doc             = JFactory::getDocument();
$lang            = JFactory::getLanguage();
$user            = JFactory::getUser();
$this->language  = $doc->language;
$this->direction = $doc->direction;
$input           = $app->input;

// Add JavaScript Frameworks
JHtml::_('bootstrap.framework');
$doc->addScriptVersion($this->baseurl . '/templates/' . $this->template . '/js/template.js');

// Add Stylesheets
$doc->addStyleSheetVersion($this->baseurl . '/templates/' . $this->template . '/css/template.min.css');

// Load specific language related CSS
$languageCss = 'language/' . $lang->getTag() . '/' . $lang->getTag() . '.css';

if (file_exists($languageCss) && filesize($languageCss) > 0)
{
	$doc->addStyleSheetVersion($languageCss);
}

// Load custom.css
$customCss = 'templates/' . $this->template . '/css/custom.css';

if (file_exists($customCss) && filesize($customCss) > 0)
{
	$doc->addStyleSheetVersion($customCss);
}

// Detecting Active Variables
$option      = $input->get('option', '');
$view        = $input->get('view', '');
$layout      = $input->get('layout', '');
$task        = $input->get('task', '');
$itemid      = $input->get('Itemid', '');
$sitename    = htmlspecialchars($app->get('sitename', ''), ENT_QUOTES, 'UTF-8');
$cpanel      = ($option === 'com_cpanel');
$hidden      = JFactory::getApplication()->input->get('hidemainmenu');
$showSubmenu = false;
$logoLg      = $this->baseurl . '/templates/' . $this->template . '/images/logo.png';
$logoSm      = $this->baseurl . '/templates/' . $this->template . '/images/logo-icon-only.png';


?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<jdoc:include type="head" />
</head>

<body class="admin <?php echo $option . ' view-' . $view . ' layout-' . $layout . ' task-' . $task . ' itemid-' . $itemid; ?>">

	<?php // Wrapper ?>
	<div id="wrapper" class="wrapper closed">

		<?php // Sidebar ?>
		<div id="sidebar-wrapper" class="sidebar-wrapper" <?php echo $hidden ? 'data-hidden="' . $hidden . '"' :''; ?>>
			<div id="main-brand-sm" class="main-brand">
				<img src="<?php echo $logoSm; ?>" class="logo" alt="<?php echo $sitename;?>" />
			</div>
			<div id="main-brand" class="main-brand hidden-xs-up">
				<img src="<?php echo $logoLg; ?>" class="logo" alt="<?php echo $sitename;?>" />
			</div>
			<jdoc:include type="modules" name="menu" style="none" />
		</div>

		<?php // Header ?>
		<header id="header" class="header">
			<div class="container-fluid">
				<div class="row flex-items-xs-middle">
					<div class="col-xs">
						<div class="menu-collapse">
							<a id="menu-collapse" class="menu-toggle" href="#">
								<span></span>
							</a>
						</div>
					</div>

					<div class="col-xs text-xs-center">
						<a class="navbar-brand" href="<?php echo JUri::root(); ?>" title="<?php echo JText::sprintf('TPL_ATUM_PREVIEW', $sitename); ?>" target="_blank"><?php echo JHtml::_('string.truncate', $sitename, 28, false, false); ?>
							<span class="icon-out-2 small"></span>
						</a>
					</div>

					<div class="col-xs text-xs-right">
						<jdoc:include type="modules" name="title" />
					</div>
				</div>
			</div>
		</header>

		<?php // container-fluid ?>
		<div class="container-fluid container-main">

			<?php if (!$cpanel) : ?>
				<?php // Subheader ?>
				<a class="btn btn-subhead hidden-md-up" data-toggle="collapse" data-target=".subhead-collapse"><?php echo JText::_('TPL_ATUM_TOOLBAR'); ?>
					<span class="icon-wrench"></span></a>
				<div class="subhead-collapse" data-scroll="<?php echo $hidden; ?>">
					<div id="subhead" class="subhead">
						<div class="container-fluid">
							<div id="container-collapse" class="container-collapse"></div>
							<div class="row">
								<div class="col-md-12">
									<jdoc:include type="modules" name="toolbar" style="no" />
								</div>
							</div>
						</div>
					</div>
				</div>
			<?php endif; ?>

			<section id="content" class="content">
				<?php // Begin Content ?>
				<jdoc:include type="modules" name="top" style="xhtml" />
				<div class="row">

					<?php if ($showSubmenu) : ?>
					<div class="col-md-2">
						<jdoc:include type="modules" name="submenu" style="none" />
					</div>

					<div class="col-md-10">
						<?php else : ?>
						<div class="col-md-12">
							<?php endif; ?>
							<jdoc:include type="component" />
						</div>
					</div>

					<?php if ($this->countModules('bottom')) : ?>
						<jdoc:include type="modules" name="bottom" style="xhtml" />
					<?php endif; ?>
				</div>
				<?php // End Content ?>
			</section>

			<?php if (!$this->countModules('status')) : ?>
				<footer class="footer">
					<p align="center">
						<jdoc:include type="modules" name="footer" style="no" />
						&copy; <?php echo $sitename; ?> <?php echo date('Y'); ?></p>
				</footer>
			<?php endif; ?>

			<?php if ($this->countModules('status')) : ?>
				<?php // Begin Status Module ?>
				<div id="status" class="status navbar navbar-fixed-bottom hidden-sm-down">
					<div class="btn-group details float-sm-right">
						<p>
							<jdoc:include type="modules" name="footer" style="no" />
							&copy; <?php echo date('Y'); ?> <?php echo $sitename; ?>
						</p>
					</div>
					<jdoc:include type="modules" name="status" style="no" />
				</div>
				<?php // End Status Module ?>
			<?php endif; ?>

		</div>

		<jdoc:include type="modules" name="debug" style="none" />

	</div>

	<div class="notify-alerts">
		<jdoc:include type="message" />
	</div>

</body>
</html>
