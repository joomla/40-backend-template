<?php
/**
 * @package     Joomla.UnitTest
 * @subpackage  HTML
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Test class for JHtmlUser.
 *
 * @package     Joomla.UnitTest
 * @subpackage  HTML
 * @since       3.1
 */
class JHtmlUserTest extends TestCaseDatabase
{
	/**
	 * Sets up the fixture, for example, opens a network connection.
	 * This method is called before a test is executed.
	 *
	 * @return  void
	 *
	 * @since   3.1
	 */
	protected function setUp()
	{
		parent::setUp();

		// Get the mocks
		$this->saveFactoryState();

		$mockApp = $this->getMockCmsApp();
		$mockApp->expects($this->any())
			->method('getDispatcher')
			->willReturn($this->getMockDispatcher());
		JFactory::$application = $mockApp;
	}

	/**
	 * Tears down the fixture, for example, closes a network connection.
	 * This method is called after a test is executed.
	 *
	 * @return  void
	 *
	 * @since   3.1
	 */
	protected function tearDown()
	{
		$this->restoreFactoryState();

		parent::tearDown();
	}

	/**
	 * Gets the data set to be loaded into the database during setup
	 *
	 * @return  \PHPUnit\DbUnit\DataSet\CsvDataSet
	 *
	 * @since   3.1
	 */
	protected function getDataSet()
	{
		$dataSet = new \PHPUnit\DbUnit\DataSet\CsvDataSet(',', "'", '\\');

		$dataSet->addTable('jos_users', JPATH_TEST_DATABASE . '/jos_users.csv');
		$dataSet->addTable('jos_usergroups', JPATH_TEST_DATABASE . '/jos_usergroups.csv');
		$dataSet->addTable('jos_user_usergroup_map', JPATH_TEST_DATABASE . '/jos_user_usergroup_map.csv');

		return $dataSet;
	}

	/**
	 * Tests the JHtmlUser::groups method.
	 *
	 * @return  void
	 *
	 * @since   3.1
	 */
	public function testGroups()
	{
		$this->assertThat(
			JHtmlUser::groups(),
			$this->arrayHasKey('3'),
			'Line:' . __LINE__ . ' The groups method should an array with eight keys; key 3 is "- - - Super Users".'
		);
	}

	/**
	 * Tests the JHtmlUser::userlist method.
	 *
	 * @return  void
	 *
	 * @since   3.1
	 */
	public function testUserlist()
	{
		$this->assertThat(
			JHtmlUser::userlist(),
			$this->arrayHasKey('2'),
			'Line:' . __LINE__ . ' The userlist method should an array with four keys; key 2 is "Super User".'
		);
	}
}
