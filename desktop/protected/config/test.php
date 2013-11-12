<?php

if (!function_exists('_path'))
{
	function _path($dir)
	{
		return realpath(dirname(__FILE__) . '/../..' . DIRECTORY_SEPARATOR . $dir);
	}
}

// TODO: whitelist production/demo/staging servers, default to development
switch (gethostname())
{
	case 'DavesLaptop':
		$environment = 'development';
		break;
		
	default:
		$environment = 'production';
}

$location_main 	= 'main/' . $environment . '.php';
$location_test 	= 'test/' . $environment . '.php';

if (!file_exists(__DIR__ . '/' . $location_main))
{
	echo 'Main Configuration not found at ' . $location_main;
	die;
}

if (!file_exists(__DIR__ . '/' . $location_test))
{
	echo 'Test Configuration not found at ' . $location_test;
	die;
}

$protected 	= _path('protected');
$runtime   	= _path('runtime');

return CMap::mergeArray(include $location_main, include $location_test);