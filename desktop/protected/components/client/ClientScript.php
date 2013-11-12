<?php

class ClientScript extends CClientScript
{
	// ignore
	public $minScriptControllerId;
	public $minScriptCacheId;
	public $minScriptDebug;
	public $minScriptUrlMap;
	
	public function registerScriptFile($url, $position = NULL, array $options = array())
	{
		if (!Yii::app()->getController()->isAjax())
		{
			parent::registerScriptFile($url, $position, $options);
		}
		
		return $this;
	}
	
	public function getScriptFiles()
	{
		$this->remapScripts();
		
		return $this->scriptFiles;
	}
	
	public function getCssFiles()
	{
		return $this->cssFiles;
	}
}