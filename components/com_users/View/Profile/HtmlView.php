<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
namespace Joomla\Component\Users\Site\View\Profile;

defined('_JEXEC') or die;

use Joomla\CMS\Helper\TagsHelper;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use Joomla\CMS\User\User;
use Joomla\Component\Users\Administrator\Helper\UsersHelper;
use Joomla\Database\DatabaseDriver;
use Joomla\CMS\Factory;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Language\Text;

/**
 * Profile view class for Users.
 *
 * @since  1.6
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * Profile form data for the user
	 *
	 * @var  User
	 */
	protected $data;

	/**
	 * The \JForm object
	 *
	 * @var  \JForm
	 */
	protected $form;

	/**
	 * The page parameters
	 *
	 * @var  \Joomla\Registry\Registry|null
	 */
	protected $params;

	/**
	 * The model state
	 *
	 * @var  CMSObject
	 */
	protected $state;

	/**
	 * An instance of DatabaseDriver.
	 *
	 * @var    DatabaseDriver
	 * @since  3.6.3
	 */
	protected $db;

	/**
	 * Configuration forms for all two-factor authentication methods.
	 *
	 * @var    array
	 * @since  4.0.0
	 */
	protected $twofactorform;

	/**
	 * List of two factor authentication methods available.
	 *
	 * @var    array
	 * @since  4.0.0
	 */
	protected $twofactormethods;

	/**
	 * One time password (OTP) – a.k.a. two factor authentication – configuration for the user.
	 *
	 * @var    \stdClass
	 * @since  4.0.0
	 */
	protected $otpConfig;

	/**
	 * The page class suffix
	 *
	 * @var    string
	 * @since  4.0.0
	 */
	protected $pageclass_sfx = '';

	/**
	 * Execute and display a template script.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed   A string if successful, otherwise an Error object.
	 *
	 * @since   1.6
	 * @throws  \Exception
	 */
	public function display($tpl = null)
	{
		$user = Factory::getUser();

		// Get the view data.
		$this->data	        = $this->get('Data');
		$this->form	        = $this->getModel()->getForm(new CMSObject(array('id' => $user->id)));
		$this->state            = $this->get('State');
		$this->params           = $this->state->get('params');
		$this->twofactorform    = $this->get('Twofactorform');
		$this->twofactormethods = UsersHelper::getTwoFactorMethods();
		$this->otpConfig        = $this->get('OtpConfig');
		$this->db               = Factory::getDbo();

		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			throw new \JViewGenericdataexception(implode("\n", $errors), 500);
		}

		// View also takes responsibility for checking if the user logged in with remember me.
		$cookieLogin = $user->get('cookieLogin');

		if (!empty($cookieLogin))
		{
			// If so, the user must login to edit the password and other data.
			// What should happen here? Should we force a logout which destroys the cookies?
			$app = Factory::getApplication();
			$app->enqueueMessage(Text::_('JGLOBAL_REMEMBER_MUST_LOGIN'), 'message');
			$app->redirect(Route::_('index.php?option=com_users&view=login', false));

			return false;
		}

		// Check if a user was found.
		if (!$this->data->id)
		{
			throw new \Exception(Text::_('JERROR_USERS_PROFILE_NOT_FOUND'), 404);
		}

		$this->data->tags = new TagsHelper;
		$this->data->tags->getItemTags('com_users.user', $this->data->id);

		PluginHelper::importPlugin('content');
		$this->data->text = '';
		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_users.user', &$this->data, &$this->data->params, 0));
		unset($this->data->text);

		// Check for layout override
		$active = Factory::getApplication()->getMenu()->getActive();

		if (isset($active->query['layout']))
		{
			$this->setLayout($active->query['layout']);
		}

		// Escape strings for HTML output
		$this->pageclass_sfx = htmlspecialchars($this->params->get('pageclass_sfx'));

		$this->prepareDocument();

		return parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @return  void
	 *
	 * @since   1.6
	 * @throws  \Exception
	 */
	protected function prepareDocument()
	{
		$app   = Factory::getApplication();
		$menus = $app->getMenu();
		$user  = Factory::getUser();
		$title = null;

		// Because the application sets a default page title,
		// we need to get it from the menu item itself
		$menu = $menus->getActive();

		if ($menu)
		{
			$this->params->def('page_heading', $this->params->get('page_title', $user->name));
		}
		else
		{
			$this->params->def('page_heading', Text::_('COM_USERS_PROFILE'));
		}

		$title = $this->params->get('page_title', '');

		if (empty($title))
		{
			$title = $app->get('sitename');
		}
		elseif ($app->get('sitename_pagetitles', 0) == 1)
		{
			$title = Text::sprintf('JPAGETITLE', $app->get('sitename'), $title);
		}
		elseif ($app->get('sitename_pagetitles', 0) == 2)
		{
			$title = Text::sprintf('JPAGETITLE', $title, $app->get('sitename'));
		}

		$this->document->setTitle($title);

		if ($this->params->get('menu-meta_description'))
		{
			$this->document->setDescription($this->params->get('menu-meta_description'));
		}

		if ($this->params->get('menu-meta_keywords'))
		{
			$this->document->setMetaData('keywords', $this->params->get('menu-meta_keywords'));
		}

		if ($this->params->get('robots'))
		{
			$this->document->setMetaData('robots', $this->params->get('robots'));
		}
	}
}
