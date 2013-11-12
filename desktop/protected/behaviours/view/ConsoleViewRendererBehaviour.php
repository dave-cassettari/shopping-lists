<?php

class ConsoleViewRendererBehaviour extends AbstractBehaviour
{
	public function getClientScript()
	{
		return new CClientScript();
	}
	
	public function getLayoutPath()
	{
		return Yii::app()->getBasePath() . '/views/layouts';
	}
	
	public function getViewPath()
	{
		return Yii::app()->getBasePath() . '/views';
	}
	
	public function getViewRenderer()
	{
		return NULL;
	}

	public function getTheme()
	{
		return NULL;
	}
}