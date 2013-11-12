<?php

class ArrayLength extends CValidator
{
	public $min 	= NULL;
	public $max 	= NULL;
	public $objects = 'Items';
	
	protected function validateAttribute($object, $attribute)
	{
		$value = $object->$attribute;
		
		if (!is_array($value))
		{
			$params = array(
				'{attribute}' => $attribute,
			);
			$this->addError($object, $attribute, WebUser::t('{attribute} must be an array', $params));
		}
		
		if ($this->min !== NULL && sizeof($value) < $this->min)
		{
			$params = array(
				'{min}' 	=> $this->min,
				'{objects}' => $this->objects,
			);
			$this->addError($object, $attribute, WebUser::t('Minimum {min} {objects}', $params));
		}
		
		if ($this->max !== NULL && sizeof($value) > $this->max)
		{
			$params = array(
				'{max}' 	=> $this->max,
				'{objects}' => $this->objects,
			);
			$this->addError($object, $attribute, WebUser::t('Maximum {max} {objects}', $params));
		}
	}
}