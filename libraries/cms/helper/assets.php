<?php
defined('_JEXEC') or die;

abstract class JHelperAssets
{
	public static function getCoreAssets()
	{
		 return [
			'jquery' => ['version' => '2.2.4','dependencies' => ''],
			'jquery-migrate' => ['version' => '1.4.1','dependencies' => 'jquery'],
			'bootstrap' => ['version' => '~4.0.0-alpha.5','dependencies' => 'jquery, tether'],
			'tether' => ['version' => '1.3.7','dependencies' => ''],
			'font-awesome' => ['version' => '4.7.0','dependencies' => ''],
			'jquery-minicolors' => ['version' => '2.1.10','dependencies' => 'jquery'],
			'jquery-sortable' => ['version' => '0.9.13','dependencies' => 'jquery'],
			'jquery-ui' => ['version' => '1.12.1','dependencies' => 'jquery'],
			'mediaelement' => ['version' => '2.23.4','dependencies' => 'jquery'],
			'punycode' => ['version' => '1.4.1','dependencies' => ''],
			'tinymce' => ['version' => '4.5.0','dependencies' => ''],
			'awesomplete' => ['version' => '1.1.1','dependencies' => ''],
			'dragula' => ['version' => '3.7.2','dependencies' => ''],
			'codemirror' => ['version' => '5.21.0','dependencies' => ''],
			'cropperjs' => ['version' => '0.8.1','dependencies' => ''],
			
		];
	}
}
