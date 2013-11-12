<?php

abstract class AbstractAction extends CAction
{
	const SESSION_KEY_REDIRECT = AbstractController::SESSION_KEY_REDIRECT;
	
	public $link;
	
	public function __construct(CController $controller, $id)
	{
		parent::__construct($controller, $id);

		$this->init();
	}
	
	public function __call($name, $arguments)
	{
		try
		{
			return call_user_func_array(array($this->getController(), $name), $arguments);
		}
		catch (Exception $ex)
		{
			self::log($ex->getMessage(), CLogger::LEVEL_ERROR);
			
			throw $ex;
		}
	}
	
	public static function __callStatic($name, $arguments)
	{
		try
		{
			return call_user_func_array(array('AbstractController', $name . 'h'), $arguments);
		}
		catch (Exception $ex)
		{
			self::log($ex->getMessage(), CLogger::LEVEL_ERROR);
			
			throw $ex;
		}
	}
	
// 	public function guest()
// 	{
// 		return $this->getController()->guest();
// 	}
	
// 	public function user()
// 	{
// 		return $this->getController()->user();
// 	}
	
// 	public function isLoggedInUser(User $user)
// 	{
// 		return $this->getController()->isLoggedInUser($user);
// 	}

// 	protected function render($view, array $data = NULL, $return = FALSE, $layout = FALSE)
// 	{
// 		return $this->getController()->render($view, $data, $return, $layout);
// 	}

	public function title($value)
	{
		call_user_func_array(array($this->getController(), 'title'), func_get_args());

		return $this;
	}
	
// 	public function subtitle($value)
// 	{
// 		$this->getController()->subtitle($value);
		
// 		return $this;
// 	}
	
// 	public function setLayout($name, $folder = '//layouts/')
// 	{
// 		return $this->getController()->setLayout($name, $folder);
// 	}

	protected function init()
	{
		$this->link = $this->getController()->link;
	}

	protected function redirect($url, array $params = array(), $make_absolute = TRUE)
	{
		if ($url == Yii::app()->getRequest()->getUrl())
		{
			return FALSE;
		}
		
		if ($make_absolute)
		{
			$url = $this->createAbsoluteUrl($url, $params);
		}
		
		return $this->getController()->redirect($url);
	}
	
	protected function createAbsoluteUrl($route, $params = array(), $schema = '', $ampersand = '&')
	{
		return $this->getController()->createAbsoluteUrl($route, $params, $schema, $ampersand);
	}
	
// 	protected function back()
// 	{
// 		return $this->getController()->back();
// 	}
	
// 	protected function loginUrl()
// 	{
// 		return $this->getController()->loginUrl();
// 	}
	
// 	protected function isAjax()
// 	{
// 		return $this->getController()->isAjax();
// 	}
	
// 	protected function isPost()
// 	{
		
// 		return $this->getController()->isPost();
// 	}
	
	protected function export($format, $view, $title, array $data)
	{
		$this->getController()->layout = '//layouts/pdf';
		
		$content = $this->render($view, $data, TRUE);
		
		return exportAs($content, (string)$format, $title);
	}
	
// 	protected function send($subject, $view, array $data = array(), $to = array(), $from = array())
// 	{
// 		return $this->getController()->send($subject, $view, $data, $to, $from);
// 	}
	
	protected function runInternalParams($name, array $methodParams = array())
	{
		$action = $this->getController()->getActionParams();
		$action = CMap::mergeArray($action, $methodParams);
		$method = new ReflectionMethod($this, $name);
		$params = array();
	
		foreach ($method->getParameters() as $param)
		{
			$paramName = $param->getName();
				
			if (isset($action[$paramName]))
			{
				if ($param->isArray())
				{
					$params[] = is_array($action[$paramName]) ? $action[$paramName] : array($action[$paramName]);
				}
				else if(!is_array($action[$paramName]))
				{
					$params[] = $action[$paramName];
				}
				else
				{
					return FALSE;
				}
			}
			else if ($param->isDefaultValueAvailable())
			{
				$params[] = $param->getDefaultValue();
			}
			else
			{
				return FALSE;
			}
		}
	
		return $method->invokeArgs($this, $params);
	}
	
// 	public function getSubdomain()
// 	{
// 		return $this->getController()->getSubdomain();
// 	}
	
// 	public function isDemo()
// 	{
// 		return $this->getController()->isDemo();
// 	}
	
// 	protected static function log($message, $level = CLogger::LEVEL_INFO, $flush = FALSE)
// 	{
// 		AbstractController::log($message, $level, $flush);
// 	}
}
