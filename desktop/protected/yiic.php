<?php

foreach ($_SERVER['argv'] as $id => $variable)
{
	if (preg_match('/^--env=[a-zA-Z0-9]+$/', $variable))
	{
		$environment = str_replace('--env=', '', $variable);
		
		putenv('APPLICATION_ENV=' . $environment);
		
		unset($_SERVER['argv'][$id]);
	}
}

if (getenv('APPLICATION_ENV') === FALSE)
{
	// TODO: whitelist production and staging hostnames
	switch (gethostname())
	{
		case 'DavesLaptop': putenv('APPLICATION_ENV=development'); 	break;
		default: 			putenv('APPLICATION_ENV=production'); 	break;
	}
}

$environment 	= getenv('APPLICATION_ENV') ?: 'development';
$protected 		= dirname(__FILE__);
$yii 			= $protected . '/../framework/yii.php';
$app 			= $protected . '/commands/ConsoleApplication.php';
$config 		= $protected . '/config/console.php';

switch ($environment)
{
	case 'development':
		defined('YII_DEBUG') or define('YII_DEBUG', TRUE);
		break;
		
	case 'staging':
	case 'demonstration':
		defined('YII_DEBUG') or define('YII_DEBUG', TRUE);
		break;
		
	default:
		defined('YII_DEBUG') or define('YII_DEBUG', FALSE);
}

defined('YII_TRACE_LEVEL') 	or define('YII_TRACE_LEVEL', 	0);
defined('YII_PROTECTED') 	or define('YII_PROTECTED', 		$protected);

if (YII_DEBUG)
{
	error_reporting(E_ALL ^ E_DEPRECATED);
}

require_once($yii);
require_once($app);

$app = new ConsoleApplication($config);
$app->run();
