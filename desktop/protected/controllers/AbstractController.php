<?php

abstract class AbstractController extends CController
{
	const DEFAULT_FORMAT 		= 'html';
	const SESSION_KEY_REDIRECT 	= 'redirect';

	public $subtitle 	= NULL;
	public $layout 		= '//layouts/title';
	public $menu 		= array();
	public $breadcrumbs = array();
	public $link;

	private $_user 		= NULL;

	public static function onBeginRequest($event)
	{
		Yii::beginProfile('request');
	}

	public static function onEndRequest($event)
	{
		Yii::endProfile('request');
	}
	
	public function init()
	{
		parent::init();
		
		$this->link = Yii::app()->getComponent('link');
	}

	public function guest()
	{
		return Yii::app()->getUser()->getIsGuest();
	}

	public function user()
	{
		if ($this->guest())
		{
			$session = Yii::app()->getSession();
			
			$session->add(self::SESSION_KEY_REDIRECT, Yii::app()->getRequest()->getUrl());
			
			return $this->redirect('/login');
		}

		$request = Yii::app()->getRequest();

		if (!$this->_user)
		{
			$this->_user = User::getFromID(Yii::app()->getUser()->getId());

			if ($this->_user->isSuspended())
			{
				$url = $this->createUrl('/account/suspended');

				if ($url != $request->getUrl())
				{
					return $this->redirect($url);
				}
			}
			else if ($this->_user->requiresPasswordReset())
			{
				$url = $this->createUrl('/edit/profile/password');

				if ($url != $request->getUrl())
				{
					return $this->redirect($url);
				}
			}
		}

		$login = $this->_user->login();

		if ($login === NULL ||
			$login->login_ip 	!= $request->getUserHostAddress() ||
			$login->login_agent != $request->getUserAgent())
		{
			$url = $this->createUrl('/logout');
			
			if ($url != $request->getUrl())
			{
				return $this->redirect($url);
			}
		}

		return $this->_user;
	}

	public function isLoggedInUser(User $user)
	{
		if ($this->guest())
		{
			return FALSE;
		}
		
		return ($this->user()->id == $user->id);
	}

	public function setPageTitle($value)
	{
		$num_args 	= func_num_args();
		$delimiter 	= param('page.title.delimiter');

		for ($i = 1; $i < $num_args; $i ++)
		{
			$value = $value . $delimiter . func_get_arg($i);
		}
		
		parent::setPageTitle($value);

		return $this;
	}

	public function title($value)
	{
		return call_user_func_array(array($this, 'setPageTitle'), func_get_args());
	}
	
	public function subtitle($value)
	{
		$this->subtitle = $value;
		
		return $this;
	}

	public function render($view, $data = NULL, $return = FALSE)
	{
		$views 	= array();
		$format = Yii::app()->getRequest()->getQuery('format', self::DEFAULT_FORMAT);

		if (isset($_POST['format']))
		{
			$format = (string)$_POST['format'];
		}

		if ($this->isAjax())
		{
			if (isset($_POST['dialog']) && $_POST['dialog'] == 'true')
			{
				$this->layout = '//layouts/dialog';
			}
			else
			{
				$this->layout = '//layouts/ajax';
			}

			$views[] = $view . '-ajax';
		}

		$views[] = $view . '-' . $format;
		$views[] = $view;

		$data['base'] = Yii::app()->baseUrl;

		foreach ($views as $v)
		{
			$file = $this->getViewFile($v);

			if (!$file)
			{
				continue;
			}
				
			return parent::render($v, $data, $return);
		}

		throw new CHttpException(404, 'Could not find view for ' . $view);
	}

	public function processOutput($output, $force = FALSE)
	{
		if ($this->isAjax() && !$force)
		{
			return $output;
		}

		return parent::processOutput($output);
	}

	public function setLayout($name, $folder = '//layouts/')
	{
		$this->layout = $folder . $name;
		
		return $this;
	}

	public function getCurrentUrl()
	{
		$url = Yii::app()->getRequest()->getUrl();
		$url = str_replace(Yii::app()->getBasePath(), '', $url);

		return $url;
	}

	public function getLoginUrl()
	{
		return $this->createUrl('/login', array(
			//'url' => urlencode(Yii::app()->getRequest()->getUrl())
		));
	}
	
	public function redirect($url, $terminate = TRUE, $status_code = 302)
	{
		if ($this->isAjax())
		{
			$json = array(
				'redirect' => $url,
			);

			echo CJSON::encode($json);

			Yii::app()->end();
		}
		
		parent::redirect($url, $terminate, $status_code);

		return $this;
	}

	public function goBack($no_referrer = NULL)
	{
		$referrer = Yii::app()->getRequest()->getUrlReferrer();

		if ($referrer === NULL)
		{
			if (!$no_referrer)
			{
				$no_referrer = Yii::app()->getHomeUrl();
			}

			$this->redirect($no_referrer);
		}

		$this->redirect($referrer);
	}

	public function isAjax()
	{
		return Yii::app()->getRequest()->getIsAjaxRequest();
	}

	public function isPost()
	{
		return (Yii::app()->getRequest()->getRequestType() === 'POST');
	}

	public function clientWidget($name, array $params = NULL, $extra_class = NULL, $add_class = TRUE, $return = FALSE)
	{
		$data 		= 'data-' . $name;
		$value 		= ($params) ? json_encode($params) : '';
		$attribute 	= $data . "='" . $value . "'";

		if ($add_class)
		{
			$class = 'widget ' . $name;

			if ($extra_class)
			{
				$class .= ' ' . $extra_class;
			}

			$attribute = $attribute . ' class="' . $class . '"';
		}

		if (!$return)
		{
			echo $attribute;
		}

		return $attribute;
	}

	public function send($subject, $view, array $data = array(), $to = array(), $from = NULL)
	{
		$oldLayout 		= $this->layout;
		$this->layout 	= 'application.views.layouts.email';
		
		$user = NULL;
		$body = $this->render($view, $data, TRUE);

		$this->layout = $oldLayout;
		
		if (!$this->guest())
		{
			$user = $this->user();
		}
		
		if ($to instanceof User)
		{
			$to = array(
				$to->name => $to->email,
			);
		}
		
		return Email::send($subject, $body, $to, $user, $from);
	}
	
	public function getSubdomain()
	{
		$url 	= Yii::app()->createAbsoluteUrl(Yii::app()->getRequest()->getUrl());
		$parsed = parse_url($url);
		$host 	= explode('.', $parsed['host']);
		
		return $host[0];
	}
	
	public function isDemo()
	{
		return (param('demo.enabled') === TRUE && getenv('APPLICATION_ENV') != 'production');
	}
	
	public function log($message, $level = CLogger::LEVEL_INFO, $flush = FALSE)
	{
		$reflector 	= new ReflectionClass(get_called_class());
		$filename 	= $reflector->getFileName();
		$extension 	= pathinfo($filename, PATHINFO_EXTENSION);
		$path 		= str_replace(Yii::app()->basePath, '', $filename);
		$path 		= str_replace('.' . $extension, '', $path);
		$path 		= str_replace('\\', '.', $path);
		
		if ($module = $this->getModule())
		{
			$path = $module->getName() . $path;
		}
		else
		{
			$path = 'application' . $path;
		}
		
		Yii::log($message, $level, $path);
		
		if ($flush)
		{
			Yii::getLogger()->flush(TRUE);
		}
	}
}
