<?php

class UniqueComposite extends CValidator
{
	public $keys;
	public $className;
	public $message = 'That combination already exists';
	
	protected function validateAttribute($object, $attribute)
	{
		$attrs = array();
		
		foreach ($this->keys as $attr)
		{
			$attrs[$attr] = $object->$attr;
		}
		
		$model = CActiveRecord::model($this->className);
		$count = $model->countByAttributes($attrs);
		
		if ($count > 0)
		{
			$this->addError($object, $attribute, $this->message);
		}
	}
}
