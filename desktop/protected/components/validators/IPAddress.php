<?php

class IpAddress extends CValidator
{
	public $message = 'Invalid IP';
	
	protected function validateAttribute($object, $attribute)
	{
		$message 	= WebUser::t($this->message);
		$value 		= $object->$attribute;
		
		if (!filter_var($value, FILTER_VALIDATE_IP))
		{
			$this->addError($object, $attribute, $message);
		}
	}
}
