<?php

class NullLogRoute extends CLogRoute
{
	protected function processLogs($logs)
	{
		// do nothing
	}
	
	public function __set($name, $value)
	{
		try
		{
			parent::__set($name, $value);
		}
		catch (CException $ex)
		{
			// ignore
		}
	}
}