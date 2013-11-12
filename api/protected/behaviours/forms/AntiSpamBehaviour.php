<?php

class AntiSpamBehaviour extends CModelBehavior
{
	public $sessionKey  = 'anti-spam';
	public $honeypot 	= NULL;
	public $submitTime 	= NULL;
	public $message 	= NULL;

	private $_valid = TRUE;

	public function afterConstruct($event)
	{
		parent::afterConstruct($event);

		$this->setEnabled($this->isInScenario());

		if (Yii::app()->getSession()->get($this->sessionKey, FALSE) === FALSE)
		{
			Yii::app()->getSession()->add($this->sessionKey, microtime(TRUE));
		}
	}
	
	public function beforeValidate($event)
	{
		$form = $this->getOwner();
		
		if ($this->honeypot !== NULL)
		{
			if (isset($_POST[$this->honeypot]) && !empty($_POST[$this->honeypot]))
			{
				$this->spam($form);
			}
		}
		
		if ($this->submitTime !== NULL)
		{
			$start 	= Yii::app()->getSession()->get($this->sessionKey, microtime(TRUE));
			$end 	= microtime(TRUE);
			
			if (($end - $start) < $this->submitTime)
			{
				$this->spam($form);
			}
		}
		
		return parent::beforeValidate($event);
	}
	
	private function spam(AbstractFormModel $form)
	{
		$attributes = $form->attributes;
		$field 		= key($attributes);
		
		$form->addError($field, 'Spam');
		
		WebUser::warning($this->message);
	} 
	
	public function afterSave($event)
	{
		Yii::app()->getSession()->remove($this->sessionKey);
		
		return parent::afterSave($event);
	}
	
	protected function isInScenario()
	{
		return TRUE;
	}
}
