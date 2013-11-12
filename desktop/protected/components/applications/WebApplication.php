<?php

class WebApplication extends CWebApplication
{
	public $base_protected = 'C:/Users/Dave/Documents/Websites/Frameworks/Base/base.protected/';

	public function createController($route, $owner = NULL)
	{
		$controller = parent::createController($route, $owner);
		$path = $this->getControllerPath();

//		var_Dump($path);exit;
		if (!$controller)
		{
			$path = $this->getControllerPath();

//			var_Dump($path);
//			var_Dump($controller);exit;

			$this->setControllerPath($this->base_protected . 'controllers');

			$controller = parent::createController($route, $owner);

			$this->setControllerPath($path);
		}

		return $controller;
	}
} 