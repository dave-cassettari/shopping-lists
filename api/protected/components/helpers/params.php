<?php

if (!function_exists('boolval'))
{
	function boolval($value)
	{
		return (bool)$value;
	}
}

function param($path, $default = NULL)
{
	$names = explode('.', $path);
	$value = NULL;
	
	for ($i = 0; $i < sizeof($names); $i++)
	{
		$name = $names[$i];
		
		if ($i == 0)
		{
			if (isset(Yii::app()->params[$name]))
			{
				$value = Yii::app()->params[$name];
			}
			else
			{
				$value = $default;
			}
		}
		else
		{
			if (!is_array($value))
			{
				throw new Exception('Parent of ' . $name . ' is not an array');
			}
			
			if (!array_key_exists($name, $value))
			{
				throw new Exception('Parent of ' . $name . ' does not contain ' . $name);
			}
			
			$value = $value[$name];
		}
	}
	
	return $value;
}