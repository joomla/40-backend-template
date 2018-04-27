<?php
/**
 * @package     Joomla.UnitTest
 * @subpackage  Utilities
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Test class for JUtility.
 * Generated by PHPUnit on 2009-10-26 at 22:28:32.
 *
 * @package     Joomla.UnitTest
 * @subpackage  Utilities
 * @since       11.1
 */
class JUtilityTest extends TestCase
{
	/**
	 * @var JUtility
	 */
	protected $object;

	/**
	 * Test cases for parseAttributes
	 *
	 * @return array
	 */
	public function casesParseAttributes()
	{
		return array(
			'jdoc' => array(
				'<jdoc style="fred" />',
				array('style' => 'fred')
			),
			'xml' => array(
				"<img hear=\"something\" there=\"somethingelse\">",
				array('hear' => 'something', 'there' => 'somethingelse')
			),
		);
	}

	/**
	 * Test parseAttributes
	 *
	 * @param   string  $tag       tag to be parsed
	 * @param   array   $expected  resulting array of attribute values
	 *
	 * @return  void
	 *
	 * @dataProvider casesParseAttributes
	 * @covers  JUtility::parseAttributes
	 */
	public function testParseAttributes($tag, $expected)
	{
		$this->assertThat(
			JUtility::parseAttributes($tag),
			$this->equalTo($expected)
		);
	}
}
