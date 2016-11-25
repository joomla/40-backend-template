<?php
defined('_JEXEC') or die;

abstract class ExternalAssets
{
	public static function getCoreAssets()
	{
		 return array(
			'jquery' => array('version' => '2.2.4','dependencies' => ''),
			'jquery-migrate' => array('version' => '1.4.1','dependencies' => 'jquery'),
			'bootstrap' => array('version' => '~4.0.0-alpha.5','dependencies' => 'jquery, tether'),
			'tether' => array('version' => '1.3.7','dependencies' => ''),
			'font-awesome' => array('version' => '4.7.0','dependencies' => ''),
			'jquery-minicolors' => array('version' => '2.1.10','dependencies' => 'jquery'),
			'jquery-sortable' => array('version' => '0.9.13','dependencies' => 'jquery'),
			'jquery-ui' => array('version' => '1.12.1','dependencies' => 'jquery'),
			'mediaelement' => array('version' => '2.23.4','dependencies' => 'jquery'),
			'punycode' => array('version' => '1.4.1','dependencies' => ''),
			'tinymce' => array('version' => '4.5.0','dependencies' => ''),
			'awesomplete' => array('version' => '1.1.1','dependencies' => ''),
			'dragula' => array('version' => '3.7.2','dependencies' => ''),
			'codemirror' => array('version' => '5.21.0','dependencies' => ''),
			'cropperjs' => array('version' => '0.8.1','dependencies' => ''),
			
		);
	}
}
