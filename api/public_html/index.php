<?php

$base             = realpath(dirname(__FILE__) . '/../');
$base_framework   = $base . '/framework';
$base_protected   = $base . '/protected';
$base_public_html = $base . '/public_html';

if (!isset($dir) || !$dir)
{
	$dir = $base;
}

//set_include_path(
//	get_include_path()
//	. PATH_SEPARATOR . $base_protected
//	. PATH_SEPARATOR . $base_protected . '/controllers'
//	. PATH_SEPARATOR . $base_public_html);

$yii    = $dir . '/framework/yii.php';
$config = $dir . '/protected/config/main.php';

switch ($_SERVER['SERVER_NAME'])
{
	case 'localhost':
	case 'iim.localdomain':
	case 'demo.iim.localdomain':
		defined('YII_DEBUG') or define('YII_DEBUG', TRUE);
		break;

	default:
		defined('YII_DEBUG') or define('YII_DEBUG', TRUE);
}

if (YII_DEBUG)
{
	error_reporting(E_ALL);
}

defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL', 3);

//require_once($dir . '/../protected/components/exceptions/ExceptionHandler.php');
//
//$handler = new ExceptionHandler;

require_once($yii);
//require_once($base_protected . '/components/autoloaders/BaseAutoloader.php');
//require_once($base_protected . '/components/applications/WebApplication.php');

//YiiBase::$enableIncludePath = FALSE;

//$app = new WebApplication($config);
$app = Yii::createWebApplication($config);

//$app->setControllerPath($dir . '/protected/controllers');
//
//Yii::registerAutoloader(array('BaseAutoloader',
//	'loadClass',
//), FALSE);

$app->run();