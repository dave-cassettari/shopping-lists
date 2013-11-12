<?php

class LogBehaviour extends CActiveRecordBehavior
{
	public $ignore 			= array('Change', 'ChangeValue', 'ProjectView', 'Process');

	private $_oldAttributes = array();

	private function getOwnerClassName()
	{
		return get_class($this->getOwner());
	}

	private function getOwnerPrimaryKey()
	{
		$key = $this->getOwner()->getPrimaryKey();
		
		if (is_array($key))
		{
			$key = json_encode($key);
		}

		return $key;
	}

	private function skip()
	{
		return (in_array($this->getOwnerClassName(), $this->ignore));
	}

	private function createChange($action)
	{
		$app 		= Yii::app();
		$class 		= $this->getOwnerClassName();
		$key 		= $this->getOwnerPrimaryKey();
		$created_by = NULL;
		
		if ($app instanceof CWebApplication && !$app->getUser()->getIsGuest())
		{
			$created_by = User::getFromID($app->getUser()->getId())->login_id();
		}

		$change 			= new Change;
		$change->created_by = $created_by;
		$change->created_on = new CDbExpression('SYSDATE() + 0');
		$change->model 		= $class;
		$change->key 		= $key;
		$change->action 	= $action;

		return $change->save();
	}

	public function beforeSave($event)
	{
		$old = $this->getOldAttributes();

		if (!$this->getOwner()->getIsNewRecord() && empty($old))
		{
			$this->setOldAttributes($this->getOwner()->getAttributes());
		}

		return parent::beforeSave($event);
	}

	public function afterSave($event)
	{
		if ($this->skip())
		{
			return;
		}

		$new 	= $this->getOwner()->getAttributes();
		$old 	= $this->getOldAttributes();

		if ($this->getOwner()->getIsNewRecord())
		{
			$change = $this->createChange(Change::ACTION_CREATE);
		}
		else
		{
			$change = NULL;
			
			foreach ($new as $name => $value_new)
			{
				if (isset($old[$name]))
				{
					$value_old = $old[$name];
				}
				else
				{
					$value_old = NULL;
				}
				
				if ($value_new == $value_old)
				{
					continue;
				}
				
				if (!$change)
				{
					$change = $this->createChange(Change::ACTION_UPDATE);
				}
				
				$change_value 				= new ChangeValue;
				$change_value->name 		= $name;
				$change_value->change_id 	= $change->id;
				$change_value->value_new 	= $value_new;
				$change_value->value_old 	= $value_old;
				$change_value->save();
			}
		}
		
		$this->setOldAttributes($new);
	}

	public function afterDelete($event)
	{
		if ($this->skip())
		{
			return;
		}

		$change = $this->createChange(Change::ACTION_DELETE);
		$attrs 	= $this->getOwner()->getAttributes();
		
		foreach ($attrs as $name => $value)
		{
			$change_value 				= new ChangeValue;
			$change_value->name 		= $name;
			$change_value->change_id 	= $change->id;
			$change_value->value_new 	= $value;
			$change_value->value_old 	= NULL;
			$change_value->save();
		}
	}

	public function afterFind($event)
	{
		$this->setOldAttributes($this->getOwner()->getAttributes());
	}

	public function getOldAttributes()
	{
		return $this->_oldAttributes;
	}

	public function setOldAttributes($value)
	{
		$this->_oldAttributes = $value;
	}
}