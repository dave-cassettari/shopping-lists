<?php

class BaseAutoloader
{
	public static function loadClass($className)
	{
//		var_dump($className);

		try
		{
			$loaded = YiiBase::autoload($className);

			if ($loaded !== FALSE)
			{
				return $loaded;
			}

			var_Dump($loaded);
			var_Dump($className);

			exit;

//			YiiBase::$classMap[$className];
//
//			return YiiBase::autoload($className);

		}
		catch (Exception $ex)
		{
			var_dump('hi');
//			var_dump($ex);
			exit;
		}
	}
}