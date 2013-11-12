<?php

class WebUser extends CWebUser
{
	public static function t($message, $params = array(), $link = TRUE)
	{
		if ($link && is_array($params))
		{
			foreach ($params as $id => $param)
			{
				$url = Yii::app()->link->to($param);
				
				if ($url)
				{
					$url = Yii::app()->link->makeAbsolute($url);
					
					$params[$id] = '<a href="' . $url . '">' . $param . '</a>';
				}
			}
		}

		return Yii::t('iim', $message, $params);
	}

	public static function flashes()
	{
		$user = Yii::app()->getUser();

		if (!$user)
		{
			return array();
		}

		return $user->getFlashes();
	}

	public static function flash($class, $message, array $params = array(), $highlight = FALSE)
	{
		$user = Yii::app()->getUser();

		if ($user)
		{
			if ($highlight)
			{
				$class .= ' highlight';
			}
				
			$user->setFlash($class, WebUser::t($message, $params));
		}
	}

	public static function info($message, array $params = array(), $highlight = FALSE)
	{
		WebUser::flash('info', $message, $params, $highlight);
	}

	public static function warning($message, array $params = array(), $highlight = FALSE)
	{
		WebUser::flash('warning', $message, $params, $highlight);
	}

	public static function error($message, array $params = array(), $highlight = FALSE)
	{
		WebUser::flash('error', $message, $params, $highlight);
	}

	protected function beforeLogin($id, $states, $from_cookie)
	{
		$user = User::getFromID($id);
		
		return $user->saveLogin($from_cookie);
	}
	
	protected function afterLogout()
	{
		parent::afterLogout();
		
		session_regenerate_id(TRUE);
	}
}