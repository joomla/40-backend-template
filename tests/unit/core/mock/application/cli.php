<?php
/**
 * @package    Joomla.Test
 *
 * @copyright  Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Class to mock JApplicationCli.
 *
 * @package  Joomla.Test
 * @since    12.2
 */
class TestMockApplicationCli extends TestMockApplicationBase
{
	/**
	 * Gets the methods of the JApplicationCli object.
	 *
	 * @return  array
	 *
	 * @since   3.4
	 */
	public static function getMethods()
	{
		// Collect all the relevant methods in JApplicationCli.
		$methods = array(
			'get',
			'execute',
			'loadConfiguration',
			'out',
			'in',
			'set',
		);

		return array_merge($methods, parent::getMethods());
	}

	/**
	 * Creates and instance of the mock JApplicationCli object.
	 *
	 * @param   TestCase  $test     A test object.
	 * @param   array     $options  A set of options to configure the mock.
	 *
	 * @return  PHPUnit_Framework_MockObject_MockObject
	 *
	 * @since   12.2
	 */
	public static function create($test, $options = array())
	{
		// Create the mock.
		$mockObject = $test->getMockBuilder('JApplicationCli')
			->setMethods(self::getMethods())
			->getMockForAbstractClass();

		return self::addBehaviours($test, $mockObject, $options);
	}
}
