<?php

class SocialUserIdentity extends CBaseUserIdentity
{
	private $_user;
	
	public function user_id()
	{
		return $this->_user->id;
	}
	
	public function __construct(User $user)
	{
		$this->_user = $user;
	}
	
	public function getId()
    {
        return $this->getState('id');
    }
    
    public function getName()
    {
	    return $this->getState('name');
    }
	
    public function login(CActiveForm $form = NULL)
    {
	    if ($this->authenticate())
		{
			Yii::app()->getUser()->login($this);
			Yii::app()->controller->redirect(Yii::app()->controller->createUrl('/profile'));
			
			ForumSync::sync($this);
			
			return TRUE;
		}
		
		echo 'error';
		
		if ($form)
		{
			$form->addError('password', 'Incorrect email or password');
		}
		
		return FALSE;
	}
    
	public function authenticate()
	{
		$this->errorCode = self::ERROR_NONE;
		$this->setState('id', $this->_user->id);
		$this->setState('name', $this->_user->email);
		
		return TRUE;
	}
}