<?php

class Html5 extends CHtml
{
	public static function activeInputField($type, $model, $attribute, $htmlOptions)
	{
		return parent::activeInputField($type, $model, $attribute, $htmlOptions);
	}
}