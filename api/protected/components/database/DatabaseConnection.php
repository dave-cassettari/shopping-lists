<?php

class DatabaseConnection extends CDbConnection
{
	public function getHostname()
	{
		$parts = explode(';', $this->connectionString);
		
		foreach ($parts as $part)
		{
			list($key, $value) = explode('=', $part);
		
			switch ($key)
			{
				case 'mysql:host':
					return $value;
			}
		}
		
		return NULL;
	}
	
	public function getDatabaseName()
	{
		$parts = explode(';', $this->connectionString);
		
		foreach ($parts as $part)
		{
			list($key, $value) = explode('=', $part);
		
			switch ($key)
			{
				case 'dbname':
					return $value;
			}
		}
		
		return NULL;
	}
	
	public function getUsername()
	{
		return $this->username;
	}
	
	public function getPassword()
	{
		return $this->password;
	}
}