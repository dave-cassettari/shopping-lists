<?php

class ConsoleUser extends CApplicationComponent implements IWebUser
{
	public $id;
	public $username;
	public $allowAutoLogin;
	public $loginUrl;

	public function getId()
	{
		return $this->id;
	}

	public function getName()
	{
		return $this->username;
	}

	public function getIsGuest()
	{
		return FALSE;
	}

	public function checkAccess($operation, $params = array())
	{
		return TRUE;
	}

	public function getIsAdmin()
	{
		return TRUE;
	}
	
	public function loginRequired()
	{
		return FALSE;
	}

	public function setFlash($key, $value, $defaultValue = NULL)
	{
		return TRUE;
	}
}