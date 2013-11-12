<?php

abstract class AbstractWidget extends CWidget
{
	public function render($view, $data = array(), $return = FALSE, $layout = NULL)
	{
		if (!$layout)
		{
			return parent::render($view, $data, $return);
		}
		
		$output 	= parent::render($view, $data, TRUE);
		$layout 	= 'layouts/' . $layout;
		$content 	= $data + array('content' => $output);
		
		return parent::render($layout, $content, $return);
	}
	
	public function guest()
	{
		return Yii::app()->getController()->guest();
	}
	
	public function user()
	{
		return Yii::app()->getController()->user();
	}
	
	public function clientWidget($name, array $params = NULL, $extra_class = NULL, $add_class = TRUE, $return = FALSE)
	{
		return Yii::app()->getController()->clientWidget($name, $params, $extra_class, $add_class, $return);
	}
}