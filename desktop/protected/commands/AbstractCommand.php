<?php

abstract class AbstractCommand extends CConsoleCommand
{
	private $_controller;
	private $_start_time;
	private $_action_time;
	
	public function init()
	{
		parent::init();
		
		Yii::getLogger()->autoFlush = 1;
		Yii::getLogger()->autoDump 	= TRUE;
	}
	
	public function getController()
	{
		if (!$this->_controller)
		{
			Yii::import('application.controllers.CommandController');
			
			$this->_controller = new CommandController('command');
		}
		
		return $this->_controller;
	}
	
	protected function enableLogging($enabled = TRUE)
	{
		foreach (Yii::app()->log->routes as $route)
		{
			if ($route instanceof CWebLogRoute)
			{
				$route->enabled = $enabled;
			}
		}
	}
	
	protected function render($view, array $data = array(), $return = FALSE)
	{
		return $this->getController()->render($view, $data, $return);
	}
	
	protected function email($subject, $view, array $data = array(), $to = array(), $from = array())
	{
		return $this->getController()->send($subject, $view, $data, $to, $from);
	}
	
	protected function progress($done, $total, $size = 30)
	{
		if ($total == 0)
		{
			return;
		}
		
		$done = min($total, max(0, $done));
	
		if ($done < 1 || $this->_start_time === NULL)
		{
			$this->_start_time = time();
		}
	
		$now 	= time();
		$perc 	= (double)($done / $total);
		$bar 	= floor($perc * $size);
	
		$status_bar  = "\r[";
		$status_bar .= str_repeat('=', $bar);
	
		if ($bar < $size)
		{
			$status_bar .= '>';
			$status_bar .= str_repeat(' ', $size - $bar);
		}
		else
		{
			$status_bar .= '=';
		}
	
		$done 		= str_pad($done, strlen($total));
		$disp 		= str_pad(number_format($perc * 100, 0), 3, ' ', STR_PAD_LEFT);
		$elapsed 	= $now - $this->_start_time;
	
		$status_bar .= "] $disp%  $done/$total";
		$status_bar .= '  elapsed: ' . number_format($elapsed) . 's';
	
		echo "$status_bar  ";
		
		flush();
	
		if ($done == $total)
		{
			echo "\n";
		}
	}
	
	protected function beforeAction($action, $params)
	{
		if (!parent::beforeAction($action, $params))
		{
			return FALSE;
		}
		
		$this->_action_time = microtime(TRUE);
		
		return TRUE;
	}
	
	protected function lap($message)
	{
		$time = microtime(TRUE);
		$diff = ($time - $this->_action_time);
		
		self::log($diff . 's. ' . $message . '   M: ' . memory_get_usage());
		
		$this->_action_time = $time;
	}
	
	protected static function log($message, $level = CLogger::LEVEL_INFO, $flush = TRUE)
	{
		$reflector 	= new ReflectionClass(get_called_class());
		$filename 	= $reflector->getFileName();
		$extension 	= pathinfo($filename, PATHINFO_EXTENSION);
		$path 		= str_replace(Yii::app()->basePath, '', $filename);
		$path 		= str_replace('.' . $extension, '', $path);
		$path 		= str_replace('\\', '.', $path);
		$path 		= 'application' . $path;
		
		Yii::log($message, $level, $path);
		
		if ($flush)
		{
			Yii::getLogger()->flush(TRUE);
		}
	}
	
	protected static function curlGet($url, $headers = array(), $fields = array())
	{
		return self::curlRequest($url, FALSE, $headers, $fields);
	}
	
	protected static function curlPost($url, $headers = array(), $fields = array())
	{
		return self::curlRequest($url, TRUE, $headers, $fields);
	}
	
	protected static function curlRequest($url, $post, $headers = array(), $fields = array())
	{
		$ch = curl_init();
		
		curl_setopt_array($ch, array(
			CURLOPT_URL 			=> ($post) ? $url : $url . '?' . http_build_query($fields),
			CURLOPT_REFERER 		=> $url,
			CURLOPT_HTTPGET 		=> ($post) ? 0 : 1,
			CURLOPT_POST 			=> ($post) ? 1 : 0,
			CURLOPT_HTTPHEADER 		=> $headers,
			CURLOPT_HEADER 			=> FALSE,
			CURLOPT_SSL_VERIFYPEER 	=> FALSE,
			CURLOPT_FOLLOWLOCATION 	=> TRUE,
			CURLOPT_RETURNTRANSFER 	=> TRUE,
		));
		
		if ($post)
		{
			curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
		}
		
		$result = curl_exec($ch);
	
		curl_close($ch);
		
		if ($result === FALSE)
		{
			print_r('Curl error: ' . curl_error($ch));
		}
	
		return $result;
	}
}