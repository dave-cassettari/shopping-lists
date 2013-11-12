<?php

class ConsoleApplication extends CConsoleApplication
{
	public $controllerMap;
	
	private $_controller;
	
	public function getController()
	{
		if (!$this->_controller)
		{
			$this->_controller = new CController('site');
		}
		
		$_SERVER['SERVER_NAME'] = Yii::app()->getHomeUrl();
	
		return $this->_controller;
	}
	
	public function displayError($code, $message, $file, $line)
	{
		echo "PHP Error[$code]: $message\n";
		echo "in file $file at line $line\n";

		if (YII_DEBUG)
		{
			debug_print_backtrace();
		}
	}

	public function getUser()
	{
		return $this->getComponent('user');
	}
}