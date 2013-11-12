<?php

class Telephone extends CValidator
{
	public $allowEmpty = TRUE;
	
	protected function validateAttribute($object, $attribute)
	{
		$pattern 	= '/^([+]?[0-9 ()]+)$/';
		$value 		= $object->$attribute;
		
		if (empty($value) && $this->allowEmpty)
		{
			return;
		}
		
		if (!preg_match($pattern, $value))
		{
			$this->addError($object, $attribute, WebUser::t('Invalid Telephone'));
		}
	}
}