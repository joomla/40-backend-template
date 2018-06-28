<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_cpanel
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
namespace Joomla\Component\Cpanel\Administrator\View\System;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

defined('_JEXEC') or die;

/**
 * HTML View class for the Cpanel component
 *
 * @since  1.0
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * Execute and display a template script.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed  A string if successful, otherwise an Error object.
	 */
	private static $notEmpty = false;
	/**
	 * Execute and display a template script.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed  A string if successful, otherwise an Error object.
	 *
	 * @since   1.6
	 */
	public function display($tpl = null)
	{
		// Set toolbar items for the page
		ToolbarHelper::title(Text::_('System Panel'), 'cog help_header');
		ToolbarHelper::help('screen.cpanel');

<<<<<<< HEAD
		$user  = Factory::getUser();
		$links = [];

		// Build the array of links

		// System
		if ($user->authorise('core.admin'))
		{
			$links['MOD_MENU_SYSTEM'] = [
				// System configuration
				'com_config' => [
					'link'    => 'index.php?option=com_config',
					'title'   => 'MOD_MENU_CONFIGURATION',
					'label'   => 'MOD_MENU_CONFIGURATION_LBL',
					'desc'    => 'MOD_MENU_CONFIGURATION_DESC',
					'icon'    => 'cog'
				]
			];
			static::$notEmpty = true;
		}

		// Install
		if ($user->authorise('core.manage', 'com_installer'))
		{
			// Install
			$links['MOD_MENU_INSTALL'] = [
				'com_installer_install' => [
					'link'    => 'index.php?option=com_installer&view=install',
					'title'   => 'MOD_MENU_INSTALL_EXTENSIONS',
					'label'   => 'MOD_MENU_INSTALL_EXTENSIONS_LBL',
					'desc'    => 'MOD_MENU_INSTALL_EXTENSIONS_DESC',
					'icon'    => 'cog'
				],
				'com_installer_discover' => [
					'link'    => 'index.php?option=com_installer&view=discover',
					'title'   => 'MOD_MENU_INSTALL_DISCOVER',
					'label'   => 'MOD_MENU_INSTALL_DISCOVER_LBL',
					'desc'    => 'MOD_MENU_INSTALL_DISCOVER_DESC',
					'icon'    => 'cog'
				],
				'com_languages_install' => [
					'link'    => 'index.php?option=com_installer&view=languages',
					'title'   => 'MOD_MENU_INSTALL_LANGUAGES',
					'label'   => 'MOD_MENU_INSTALL_LANGUAGES_LBL',
					'desc'    => 'MOD_MENU_INSTALL_LANGUAGES_DESC',
					'icon'    => 'cog'
				],
			];

			static::$notEmpty = true;
		}

		// Templates
		if ($user->authorise('core.manage', 'com_templates'))
		{
			// Site
			$links['MOD_MENU_TEMPLATES'] = [
				'com_templates' => [
					'link'    => 'index.php?option=com_templates&client_id=0',
					'title'   => 'MOD_MENU_TEMPLATE_SITE_TEMPLATES',
					'label'   => 'MOD_MENU_TEMPLATE_SITE_TEMPLATES_LBL',
					'desc'    => 'MOD_MENU_TEMPLATE_SITE_TEMPLATES_DESC',
					'icon'    => 'image'
				],
				'com_templates_site_styles' => [
					'link'    => 'index.php?option=com_templates&view=styles&client_id=0',
					'title'   => 'MOD_MENU_TEMPLATE_SITE_STYLES',
					'label'   => 'MOD_MENU_TEMPLATE_SITE_STYLES_LBL',
					'desc'    => 'MOD_MENU_TEMPLATE_SITE_STYLES_DESC',
					'icon'    => 'image'
				],
				// Admin
				'com_templates_edit' => [
					'link'    => 'index.php?option=com_templates&view=templates&client_id=1',
					'title'   => 'MOD_MENU_TEMPLATE_ADMIN_TEMPLATES',
					'label'   => 'MOD_MENU_TEMPLATE_ADMIN_TEMPLATES_LBL',
					'desc'    => 'MOD_MENU_TEMPLATE_ADMIN_TEMPLATES_DESC',
					'icon'    => 'edit'
				],
				'com_templates_admin_styles' => [
					'link'    => 'index.php?option=com_templates&view=styles&client_id=1',
					'title'   => 'MOD_MENU_TEMPLATE_ADMIN_STYLES',
					'label'   => 'MOD_MENU_TEMPLATE_ADMIN_STYLES_LBL',
					'desc'    => 'MOD_MENU_TEMPLATE_ADMIN_STYLES_DESC',
					'icon'    => 'image'
				],
			];

			static::$notEmpty = true;
		}

		// Access
		//MOD_MENU_ACCESS
		if ($user->authorise('core.manage', 'com_users'))
		{
			// Site
			$links['MOD_MENU_ACCESS'] = [
				'com_users_groups' => [
					'link'    => 'index.php?option=com_users&view=groups',
					'title'   => 'MOD_MENU_ACCESS_GROUPS',
					'label'   => 'MOD_MENU_ACCESS_GROUPS_LBL',
					'desc'    => 'MOD_MENU_ACCESS_GROUPS_DESC',
					'icon'    => 'image'
				],
				'com_users_levels' => [
					'link'    => 'index.php?option=com_users&view=levels',
					'title'   => 'MOD_MENU_ACCESS_LEVELS',
					'label'   => 'MOD_MENU_ACCESS_LEVELS_LBL',
					'desc'    => 'MOD_MENU_ACCESS_LEVELS_DESC',
					'icon'    => 'image'
				],
			];

			static::$notEmpty = true;
		}

		// index.php?option=com_config#page-permissions
		if ($user->authorise('core.admin'))
		{
			$new = [
				'com_config_permissions' => [
					'link'    => 'index.php?option=com_config#page-permissions',
					'title'   => 'MOD_MENU_ACCESS_SETTINGS',
					'label'   => 'MOD_MENU_ACCESS_SETTINGS_LBL',
					'desc'    => 'MOD_MENU_ACCESS_SETTINGS_DESC',
					'icon'    => 'refresh'
				],
				'com_config_filters' => [
					'link'    => 'index.php?option=com_config#page-filters',
					'title'   => 'MOD_MENU_ACCESS_TEXT_FILTERS',
					'label'   => 'MOD_MENU_ACCESS_TEXT_FILTERS_LBL',
					'desc'    => 'MOD_MENU_ACCESS_TEXT_FILTERS_DESC',
					'icon'    => 'refresh'
				],
			];

			if (!empty($links['MOD_MENU_ACCESS']))
			{
				$links['MOD_MENU_ACCESS'] = array_merge($links['MOD_MENU_ACCESS'], $new);
			}
			else
			{
				$links['MOD_MENU_ACCESS'] = $new;
			}

			static::$notEmpty = true;
		}

		// Maintain
		if ($user->authorise('core.manage', 'com_cache'))
		{
			$links['MOD_MENU_MAINTAIN'] = [
				'com_cache' => [
					'link'    => 'index.php?option=com_cache',
					'title'   => 'MOD_MENU_CLEAR_CACHE',
					'label'   => 'MOD_MENU_CLEAR_CACHE_LBL',
					'desc'    => 'MOD_MENU_CLEAR_CACHE_DESC',
					'icon'    => 'trash'
				],
				'com_cache_purge' => [
					'link'    => 'index.php?option=com_cache&view=purge',
					'title'   => 'MOD_MENU_PURGE_EXPIRED_CACHE',
					'label'   => 'MOD_MENU_PURGE_EXPIRED_CACHE_LBL',
					'desc'    => 'MOD_MENU_PURGE_EXPIRED_CACHE_DESC',
					'icon'    => 'trash'
				],
			];

			static::$notEmpty = true;
		}

		if ($user->authorise('core.manage', 'com_checkin'))
		{
			$new = [
				'com_checkin' => [
					'link'    => 'index.php?option=com_checkin',
					'title'   => 'MOD_MENU_GLOBAL_CHECKIN',
					'label'   => 'MOD_MENU_GLOBAL_CHECKIN_LBL',
					'desc'    => 'MOD_MENU_GLOBAL_CHECKIN_DESC',
					'icon'    => 'refresh'
				],
			];

			if (!empty($links['MOD_MENU_MAINTAIN']))
			{
				$links['MOD_MENU_MAINTAIN'] = array_merge($links['MOD_MENU_MAINTAIN'], $new);
			}
			else
			{
				$links['MOD_MENU_MAINTAIN'] = $new;
			}

			static::$notEmpty = true;
		}

		// Manage
		if ($user->authorise('core.manage', 'com_installer'))
		{
			$links['MOD_MENU_MANAGE'] = [
				'com_installer_manage' => [
					'link'    => 'index.php?option=com_installer&view=manage',
					'title'   => 'MOD_MENU_MANAGE_EXTENSIONS',
					'label'   => 'MOD_MENU_MANAGE_EXTENSIONS_LBL',
					'desc'    => 'MOD_MENU_MANAGE_EXTENSIONS_DESC',
					'icon'    => 'cog'
				],
			];

			static::$notEmpty = true;
		}

		if ($user->authorise('core.manage', 'com_languages'))
		{
			$new = [
				'com_languages_installed' => [
					'link'    => 'index.php?option=com_languages&view=installed',
					'title'   => 'MOD_MENU_MANAGE_LANGUAGES',
					'label'   => 'MOD_MENU_MANAGE_LANGUAGES_LBL',
					'desc'    => 'MOD_MENU_MANAGE_LANGUAGES_DESC',
					'icon'    => 'cog'
				],
				'com_languages_content' => [
					'link'    => 'index.php?option=com_languages&view=languages',
					'title'   => 'MOD_MENU_MANAGE_LANGUAGES_CONTENT',
					'label'   => 'MOD_MENU_MANAGE_LANGUAGES_CONTENT_LBL',
					'desc'    => 'MOD_MENU_MANAGE_LANGUAGES_CONTENT_DESC',
					'icon'    => 'cog'
				],
				'com_languages_overrides' => [
					'link'    => 'index.php?option=com_languages&view=overrides',
					'title'   => 'MOD_MENU_MANAGE_LANGUAGES_OVERRIDES',
					'label'   => 'MOD_MENU_MANAGE_LANGUAGES_OVERRIDES_LBL',
					'desc'    => 'MOD_MENU_MANAGE_LANGUAGES_OVERRIDES_DESC',
					'icon'    => 'cog'
				],
			];

			if (!empty($links['MOD_MENU_MANAGE']))
			{
				$links['MOD_MENU_MANAGE'] = array_merge($links['MOD_MENU_MANAGE'], $new);
			}
			else
			{
				$links['MOD_MENU_MANAGE'] = $new;
			}

			static::$notEmpty = true;
=======
		$user     = Factory::getUser();
		$links = [
			// System configuration
			'com_config' => [
				'link'    => 'index.php?option=com_config',
				'enabled' => false,
				'title'   => 'MOD_MENU_CONFIGURATION',
				'label'   => 'MOD_MENU_CONFIGURATION',
				'desc'    => 'MOD_MENU_CONFIGURATION',
				'icon'    => 'cog'
			],
			'sysinfo' => [
				'link'    => 'index.php?option=com_admin&view=sysinfo',
				'enabled' => false,
				'title'   => 'MOD_MENU_SYSTEM_INFORMATION',
				'label'   => 'MOD_MENU_SYSTEM_INFORMATION',
				'desc'    => 'MOD_MENU_SYSTEM_INFORMATION',
				'icon'    => 'info'
			],
			'com_postinstall' => [
				'link'    => 'index.php?option=com_admin&view=sysinfo',
				'enabled' => false,
				'title'   => 'Post install messages',
				'label'   => 'Post install messages',
				'desc'    => 'Post install messages',
				'icon'    => 'info-circle'
			],

			// Maintenance
			'com_checkin' => [
				'link'    => 'index.php?option=com_checkin',
				'enabled' => false,
				'title'   => 'MOD_MENU_GLOBAL_CHECKIN',
				'label'   => 'MOD_MENU_GLOBAL_CHECKIN',
				'desc'    => 'MOD_MENU_GLOBAL_CHECKIN',
				'icon'    => 'refresh'
			],
			'com_cache' => [
				'link'    => 'index.php?option=com_cache',
				'enabled' => false,
				'title'   => 'MOD_MENU_CLEAR_CACHE',
				'label'   => 'MOD_MENU_CLEAR_CACHE',
				'desc'    => 'MOD_MENU_CLEAR_CACHE',
				'icon'    => 'trash'
			],
			'com_cache_purge' => [
				'link'    => 'index.php?option=com_cache&view=purge',
				'enabled' => false,
				'title'   => 'MOD_MENU_PURGE_EXPIRED_CACHE',
				'label'   => 'MOD_MENU_PURGE_EXPIRED_CACHE',
				'desc'    => 'MOD_MENU_PURGE_EXPIRED_CACHE',
				'icon'    => 'trash'
			],
			'database' => [
				'link'    => 'index.php?option=com_installer&view=database',
				'enabled' => false,
				'title'   => 'MOD_MENU_INSTALLER_SUBMENU_DATABASE',
				'label'   => 'MOD_MENU_INSTALLER_SUBMENU_DATABASE',
				'desc'    => 'MOD_MENU_INSTALLER_SUBMENU_DATABASE',
				'icon'    => 'refresh'
			],
			'warnings' => [
				'link'    => 'index.php?option=com_installer&view=warnings',
				'enabled' => false,
				'title'   => 'MOD_MENU_INSTALLER_SUBMENU_WARNINGS',
				'label'   => 'MOD_MENU_INSTALLER_SUBMENU_WARNINGS',
				'desc'    => 'MOD_MENU_INSTALLER_SUBMENU_WARNINGS',
				'icon'    => 'refresh'
			],

			// Plugins
			'com_plugins' => [
				'link'    => 'index.php?option=com_plugins',
				'enabled' => false,
				'title'   => 'MOD_MENU_EXTENSIONS_PLUGIN_MANAGER',
				'label'   => 'MOD_MENU_EXTENSIONS_PLUGIN_MANAGER',
				'desc'    => 'MOD_MENU_EXTENSIONS_PLUGIN_MANAGER',
				'icon'    => 'cog'
			],

			// Templates
			'com_templates' => [
				'link'    => 'index.php?option=com_templates',
				'enabled' => false,
				'title'   => 'MOD_MENU_EXTENSIONS_TEMPLATE_MANAGER',
				'label'   => 'MOD_MENU_EXTENSIONS_TEMPLATE_MANAGER',
				'desc'    => 'MOD_MENU_EXTENSIONS_TEMPLATE_MANAGER',
				'icon'    => 'image'
			],
			'com_templates_styles' => [
				'link'    => 'index.php?option=com_templates&view=styles',
				'enabled' => false,
				'title'   => 'MOD_MENU_COM_TEMPLATES_SUBMENU_STYLES',
				'label'   => 'MOD_MENU_COM_TEMPLATES_SUBMENU_STYLES',
				'desc'    => 'MOD_MENU_COM_TEMPLATES_SUBMENU_STYLES',
				'icon'    => 'image'
			],
			'com_templates_edit' => [
				'link'    => 'index.php?option=com_templates&view=templates',
				'enabled' => false,
				'title'   => 'MOD_MENU_COM_TEMPLATES_SUBMENU_TEMPLATES',
				'label'   => 'MOD_MENU_COM_TEMPLATES_SUBMENU_TEMPLATES',
				'desc'    => 'MOD_MENU_COM_TEMPLATES_SUBMENU_TEMPLATES',
				'icon'    => 'edit'
			],

			// Languages
			'com_languages' => [
				'link'    => 'index.php?option=com_languages',
				'enabled' => false,
				'title'   => 'MOD_MENU_EXTENSIONS_LANGUAGE_MANAGER',
				'label'   => 'MOD_MENU_EXTENSIONS_LANGUAGE_MANAGER',
				'desc'    => 'MOD_MENU_EXTENSIONS_LANGUAGE_MANAGER',
				'icon'    => 'cog'
			],
			'com_languages_installed' => [
				'link'    => 'index.php?option=com_languages&view=installed',
				'enabled' => false,
				'title'   => 'MOD_MENU_COM_LANGUAGES_SUBMENU_INSTALLED',
				'label'   => 'MOD_MENU_COM_LANGUAGES_SUBMENU_INSTALLED',
				'desc'    => 'MOD_MENU_COM_LANGUAGES_SUBMENU_INSTALLED',
				'icon'    => 'cog'
			],
			'com_languages_content' => [
				'link'    => 'index.php?option=com_languages&view=languages',
				'enabled' => false,
				'title'   => 'MOD_MENU_COM_LANGUAGES_SUBMENU_CONTENT',
				'label'   => 'MOD_MENU_COM_LANGUAGES_SUBMENU_CONTENT',
				'desc'    => 'MOD_MENU_COM_LANGUAGES_SUBMENU_CONTENT',
				'icon'    => 'cog'
			],
			'com_languages_overrides' => [
				'link'    => 'index.php?option=com_languages&view=overrides',
				'enabled' => false,
				'title'   => 'MOD_MENU_COM_LANGUAGES_SUBMENU_OVERRIDES',
				'label'   => 'MOD_MENU_COM_LANGUAGES_SUBMENU_OVERRIDES',
				'desc'    => 'MOD_MENU_COM_LANGUAGES_SUBMENU_OVERRIDES',
				'icon'    => 'cog'
			],
			'com_languages_install' => [
				'link'    => 'index.php?option=com_installer&view=languages',
				'enabled' => false,
				'title'   => 'MOD_MENU_INSTALLER_SUBMENU_LANGUAGES',
				'label'   => 'MOD_MENU_INSTALLER_SUBMENU_LANGUAGES',
				'desc'    => 'MOD_MENU_INSTALLER_SUBMENU_LANGUAGES',
				'icon'    => 'cog'
			],

			// Extensions
			'com_installer_manage' => [
				'link'    => 'index.php?option=com_installer&view=manage',
				'enabled' => false,
				'title'   => 'MOD_MENU_INSTALLER_SUBMENU_MANAGE',
				'label'   => 'MOD_MENU_INSTALLER_SUBMENU_MANAGE',
				'desc'    => 'MOD_MENU_INSTALLER_SUBMENU_MANAGE',
				'icon'    => 'cog'
			],
			'com_installer_discover' => [
				'link'    => 'index.php?option=com_installer&view=discover',
				'enabled' => false,
				'title'   => 'MOD_MENU_INSTALLER_SUBMENU_DISCOVER',
				'label'   => 'MOD_MENU_INSTALLER_SUBMENU_DISCOVER',
				'desc'    => 'MOD_MENU_INSTALLER_SUBMENU_DISCOVER',
				'icon'    => 'cog'
			],

			// Updates
			'com_joomlaupdate' => [
				'link'    => 'index.php?option=com_installer&view=manage',
				'enabled' => false,
				'title'   => 'System update',
				'label'   => 'System update',
				'desc'    => 'System update',
				'icon'    => 'upload'
			],
			'extensions_update' => [
				'link'    => 'index.php?option=com_installer&view=update',
				'enabled' => false,
				'title'   => 'MOD_MENU_INSTALLER_SUBMENU_UPDATE',
				'label'   => 'MOD_MENU_INSTALLER_SUBMENU_UPDATE',
				'desc'    => 'MOD_MENU_INSTALLER_SUBMENU_UPDATE',
				'icon'    => 'upload'
			],
			'update_sites' => [
				'link'    => 'index.php?option=com_installer&view=updatesites',
				'enabled' => false,
				'title'   => 'MOD_MENU_INSTALLER_SUBMENU_UPDATESITES',
				'label'   => 'MOD_MENU_INSTALLER_SUBMENU_UPDATESITES',
				'desc'    => 'MOD_MENU_INSTALLER_SUBMENU_UPDATESITES',
				'icon'    => 'edit'
			],

		];


		if ($user->authorise('core.admin'))
		{
			$links['com_config']['enabled'] = true;
			$links['sysinfo']['enabled']    = true;
			static::$notEmpty               = true;
		}

		if ($user->authorise('core.manage', 'com_checkin'))
		{
			$links['com_checkin']['enabled'] = true;
			static::$notEmpty                = true;
		}

		if ($user->authorise('core.manage', 'com_cache'))
		{
			$links['com_cache']['enabled']       = true;
			$links['com_cache_purge']['enabled'] = true;
			static::$notEmpty                    = true;
		}

		if ($user->authorise('core.manage', 'com_postinstall'))
		{
			$links['com_postinstall']['enabled'] = true;
			static::$notEmpty                    = true;
		}

		if ($user->authorise('core.manage', 'com_installer'))
		{
			$links['database']['enabled']               = true;
			$links['warnings']['enabled']               = true;
			$links['com_languages_install']['enabled']  = true;
			$links['com_installer_manage']['enabled']   = true;
			$links['com_installer_discover']['enabled'] = true;
			$links['extensions_update']['enabled']      = true;
			$links['update_sites']['enabled']           = true;
			static::$notEmpty                           = true;
>>>>>>> boom
		}

		if ($user->authorise('core.manage', 'com_plugins'))
		{
<<<<<<< HEAD
			$new = [
				'com_plugins' => [
					'link'    => 'index.php?option=com_plugins',
					'title'   => 'MOD_MENU_MANAGE_PLUGINS',
					'label'   => 'MOD_MENU_MANAGE_PLUGINS_LBL',
					'desc'    => 'MOD_MENU_MANAGE_PLUGINS_DESC',
					'icon'    => 'cog'
				],
			];

			if (!empty($links['MOD_MENU_MANAGE']))
			{
				$links['MOD_MENU_MANAGE'] = array_merge($links['MOD_MENU_MANAGE'], $new);
			}
			else
			{
				$links['MOD_MENU_MANAGE'] = $new;
			}

			static::$notEmpty = true;
		}

		if ($user->authorise('core.manage', 'com_redirect'))
		{
			$new = [
				'com_redirect' => [
					'link'    => 'index.php?option=com_redirect',
					'title'   => 'MOD_MENU_MANAGE_REDIRECTS',
					'label'   => 'MOD_MENU_MANAGE_REDIRECTS_LBL',
					'desc'    => 'MOD_MENU_MANAGE_REDIRECTS_DESC',
					'icon'    => 'cog'
				],
			];

			if (!empty($links['MOD_MENU_MANAGE']))
			{
				$links['MOD_MENU_MANAGE'] = array_merge($links['MOD_MENU_MANAGE'], $new);
			}
			else
			{
				$links['MOD_MENU_MANAGE'] = $new;
			}

			static::$notEmpty = true;
		}

		// Information
		if ($user->authorise('core.manage', 'com_installer'))
		{
			$links['MOD_MENU_INFORMATION'] = [
				'com_installer_warnings' => [
					'link'    => 'index.php?option=com_installer&view=warnings',
					'title'   => 'MOD_MENU_INFORMATION_WARNINGS',
					'label'   => 'MOD_MENU_INFORMATION_WARNINGS_LBL',
					'desc'    => 'MOD_MENU_INFORMATION_WARNINGS_DESC',
					'icon'    => 'refresh'
				],
			];

			static::$notEmpty = true;
		}

		if ($user->authorise('core.manage', 'com_postinstall'))
		{
			$new = [
				'com_postinstall' => [
					'link'    => 'index.php?option=com_postinstall',
					'title'   => 'MOD_MENU_INFORMATION_POST_INSTALL_MESSAGES',
					'label'   => 'MOD_MENU_INFORMATION_POST_INSTALL_MESSAGES_LBL',
					'desc'    => 'MOD_MENU_INFORMATION_POST_INSTALL_MESSAGES_DESC',
					'icon'    => 'info-circle'
				],
			];

			if (!empty($links['MOD_MENU_INFORMATION']))
			{
				$links['MOD_MENU_INFORMATION'] = array_merge($links['MOD_MENU_INFORMATION'], $new);
			}
			else
			{
				$links['MOD_MENU_INFORMATION'] = $new;
			}

			static::$notEmpty = true;
		}

		if ($user->authorise('core.admin'))
		{
			$new = [
				'com_admin_sysinfo' => [
					'link'    => 'index.php?option=com_admin&view=sysinfo',
					'title'   => 'MOD_MENU_SYSTEM_INFORMATION_SYSINFO',
					'label'   => 'MOD_MENU_SYSTEM_INFORMATION_SYSINFO_LBL',
					'desc'    => 'MOD_MENU_SYSTEM_INFORMATION_SYSINFO_DESC',
					'icon'    => 'info'
				],
			];

			if (!empty($links['MOD_MENU_INFORMATION']))
			{
				$links['MOD_MENU_INFORMATION'] = array_merge($links['MOD_MENU_INFORMATION'], $new);
			}
			else
			{
				$links['MOD_MENU_INFORMATION'] = $new;
			}

			static::$notEmpty = true;
		}

		if ($user->authorise('core.manage', 'com_installer'))
		{
			$new = [
				'com_installer_database' => [
					'link'    => 'index.php?option=com_installer&view=database',
					'title'   => 'MOD_MENU_SYSTEM_INFORMATION_DATABASE',
					'label'   => 'MOD_MENU_SYSTEM_INFORMATION_DATABASE_LBL',
					'desc'    => 'MOD_MENU_SYSTEM_INFORMATION_DATABASE_DESC',
					'icon'    => 'refresh'
				],
			];

			if (!empty($links['MOD_MENU_INFORMATION']))
			{
				$links['MOD_MENU_INFORMATION'] = array_merge($links['MOD_MENU_INFORMATION'], $new);
			}
			else
			{
				$links['MOD_MENU_INFORMATION'] = $new;
			}

			static::$notEmpty = true;
		}

		// Update
		if ($user->authorise('core.manage', 'com_joomlaupdate'))
		{
			$links['MOD_MENU_UPDATE'] = [
				'com_joomlaupdate' => [
					'link'    => 'index.php?option=com_joomlaupdate',
					'title'   => 'MOD_MENU_UPDATE_JOOMLA',
					'label'   => 'MOD_MENU_UPDATE_JOOMLA_LBL',
					'desc'    => 'MOD_MENU_UPDATE_JOOMLA_DESC',
					'icon'    => 'upload'
				],
			];

			static::$notEmpty = true;
		}

		if ($user->authorise('core.manage', 'com_installer'))
		{
			$new = [
				'com_installer_extensions_update' => [
					'link'    => 'index.php?option=com_installer&view=update',
					'title'   => 'MOD_MENU_UPDATE_EXTENSIONS',
					'label'   => 'MOD_MENU_UPDATE_EXTENSIONS_LBL',
					'desc'    => 'MOD_MENU_UPDATE_EXTENSIONS_DESC',
					'icon'    => 'upload'
				],
				'com_installer_update_sites' => [
					'link'    => 'index.php?option=com_installer&view=updatesites',
					'title'   => 'MOD_MENU_UPDATE_SOURCES',
					'label'   => 'MOD_MENU_UPDATE_SOURCES_LBL',
					'desc'    => 'MOD_MENU_UPDATE_SOURCES_DESC',
					'icon'    => 'edit'
				],
			];

			if (!empty($links['MOD_MENU_UPDATE']))
			{
				$links['MOD_MENU_UPDATE'] = array_merge($links['MOD_MENU_UPDATE'], $new);
			}
			else
			{
				$links['MOD_MENU_UPDATE'] = $new;
			}

			static::$notEmpty = true;
=======
			$links['com_plugins']['enabled'] = true;
			static::$notEmpty                = true;
		}

		if ($user->authorise('core.manage', 'com_templates'))
		{
			$links['com_templates']['enabled']        = true;
			$links['com_templates_styles']['enabled'] = true;
			$links['com_templates_edit']['enabled']   = true;
			static::$notEmpty                         = true;
		}

		if ($user->authorise('core.manage', 'com_languages'))
		{
			$links['com_languages']['enabled'] = true;
			static::$notEmpty                  = true;
		}

		if ($user->authorise('core.manage', 'com_joomlaupdate'))
		{
			$links['com_joomlaupdate']['enabled'] = true;
			static::$notEmpty                     = true;
>>>>>>> boom
		}

		if (static::$notEmpty)
		{
			$this->links = $links;
		}
		else
		{
<<<<<<< HEAD
			throw new NotAllowed(Text::_('JERROR_ALERTNOAUTHOR'), 403);
=======
			throw new JUserAuthorizationexception(JText::_('JERROR_ALERTNOAUTHOR'), 403);
>>>>>>> boom
		}

		Factory::getLanguage()->load(
			'mod_menu',
			JPATH_ADMINISTRATOR,
			Factory::getLanguage()->getTag(),
			true
		);

		return parent::display($tpl);
	}
}
