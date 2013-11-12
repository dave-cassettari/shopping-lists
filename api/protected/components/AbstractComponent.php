<?php

abstract class AbstractComponent extends CApplicationComponent
{
	public function guest()
	{
		return Yii::app()->getController()->guest();
	}
	
	public function user()
	{
		return Yii::app()->getController()->user();
	}
}