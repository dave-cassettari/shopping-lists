<?php

ini_set('session.gc_maxlifetime', 60 * 60 * 24);

date_default_timezone_set('Europe/London');

function _path($dir1, $dir2)
{
	return realpath($dir1 . '/' . $dir2);
}

$home      = dirname(__FILE__) . '/../..';
$protected = _path($home, 'protected');
$runtime   = _path($home, 'runtime');

require_once($protected . '/components/helpers/strings.php');
require_once($protected . '/components/helpers/dates.php');
require_once($protected . '/components/helpers/export.php');
require_once($protected . '/components/helpers/params.php');

$host = gethostname();

switch ($host)
{
	case 'lists.cassettari.org':
		$connection = 'mysql:host=localhost;dbname=seppec21_expenses';
		$username   = 'seppec21_user';
		$password   = 'seppec21User';
		break;

	default:
		$connection = 'mysql:host=localhost;dbname=dev_lists';
		$username   = 'root';
		$password   = 'admin';
		break;

}

return array(
	'basePath'    => $protected,
	'runtimePath' => $runtime,

	'name'        => 'Shopping Lists',
	'preload'     => array(
		'log',
	),

	'import'      => array(
		'application.commands.AbstractCommand',
		'application.controllers.*',
		'application.controllers.api.BaseApiAction',
		'application.models.AbstractActiveRecord',
		'application.models.AbstractFormModel',
		'application.models.JsonSerializable',
		'application.models.entities.*',
		'application.components.Html5',
		'application.components.encoding.Json',
		'application.components.AbstractWidget',
		'application.components.validators.*',
		'application.components.users.WebUser',
		'application.components.auth.AuthFilter',
		'application.components.forms.ActiveForm',
		'application.components.identity.FacebookUserIdentity',
		'application.components.identity.PasswordUserIdentity',
		'application.components.PDO.NestedPDO',
		'ext.mail.YiiMailMessage',
	),

	'modules'     => array(
		'api' => array(
			'defaultController' => 'lists',
		),
	),

	'components'  => array(
		'user'         => array(
			'class'          => 'WebUser',
			'allowAutoLogin' => FALSE,
			'loginUrl'       => array('/login'),
		),

		'urlManager'   => array(
			'urlFormat'      => 'path',
			'rules'          => array(
				''                     => 'application/angular',
				'ember'                => 'application/ember',
				'login'                => 'site/login',
				'logout'               => 'site/logout',
				'api/<_model>'         => 'api/<_model>/index/',
				'api/<_model>/<_id>/*' => 'api/<_model>/index/id/<_id>',
				'api/<_model>/*'       => 'api/<_model>/index/',
				'api/*'                => 'api/',
				'(.*)'                 => 'application/angular',
			),
			'caseSensitive'  => FALSE,
			'showScriptName' => FALSE
		),

		'db'           => array(
			'pdoClass'           => 'NestedPDO',
			'connectionString'   => $connection,
			'emulatePrepare'     => TRUE,
			'username'           => $username,
			'password'           => $password,
			'charset'            => 'utf8',
			'enableParamLogging' => TRUE,
		),

		'errorHandler' => array(
			'errorAction' => 'site/error',
		),

		'log'          => array(
			'class'  => 'CLogRouter',
			'routes' => array(),
		),

		'mail'         => array(
			'class'         => 'ext.mail.YiiMail',
			'transportType' => 'php',
			'viewPath'      => 'application.views.mail',
			'logging'       => TRUE,
			'dryRun'        => TRUE
		),
	),

	'params'      => array(
		'format' => array(
			'date'      => 'jS M Y',
			'time'      => 'g:ia',
			'datetime'  => 'jS M Y, g:ia',
			'timestamp' => 'Y-m-d H:i:s',
		),

		'page'   => array(
			'title' => array(
				'separator' => ' - ',
				'delimiter' => ' - ',
			),
		),
	)
);