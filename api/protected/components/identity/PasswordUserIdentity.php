<?php

class PasswordUserIdentity extends CUserIdentity
{
	const CRYPT_PREFIX_1 			= '$2a$';
	const CRYPT_PREFIX_2 			= '$2y$';
	const CRYPT_SUFFIX 				= '$';
	const CRYPT_BASE 				= '10$';
	const PASSWORD_VERSION_1 		= 0;
	const PASSWORD_VERSION_2 		= 1;
	const PASSWORD_VERSION_CURRENT 	= self::PASSWORD_VERSION_2;
	const PASSWORD_LENGTH_MIN 		= 8;
	const PASSWORD_LENGTH_NEW 		= 16;
	const PASSWORD_LENGTH_HASH 		= 60;
	const PASSWORD_LENGTH_SALT 		= 22;
	const INTERNAL_SALT 			= 'iim-salt';
	
	public function __construct($username, $password)
	{
		parent::__construct($username, $password);
	}
	
	public function getId()
    {
        return $this->getState('id');
    }
    
	public function authenticate()
	{
		$email 		= strtolower((string)$this->username);
		$password 	= (string)$this->password;
		$user 		= User::getFromEmail($email);
		
        if (!$user)
        {
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        }
        else
        {
        	$hash = PasswordUserIdentity::hash($password, $user->password_salt, $user->password_version);
        	
	        if ($user->password !== $hash)
	        {
	            $this->errorCode = self::ERROR_PASSWORD_INVALID;
	        }
	        else
	        {
	            $this->errorCode = self::ERROR_NONE;
	            
	            if ($user->password_version != self::PASSWORD_VERSION_CURRENT)
	            {
	            	$user->changePasswordTo($password);
	            }
	            
	            $this->setState('id', $user->id);
	        }
	        
	        unset($password);
        }
        
        return !$this->errorCode;
	}
	
	public static function hash($password, $salt, $version)
	{
		Yii::beginProfile('components.identity.PasswordUserIdentity.hash');
		
		switch ($version)
		{
			case self::PASSWORD_VERSION_1:
				$blowfish_salt = self::CRYPT_PREFIX_1 . self::CRYPT_BASE . $salt . self::CRYPT_SUFFIX;
				$blowfish_hash = crypt(sha1(self::INTERNAL_SALT . $password), $blowfish_salt);
				break;
				
			case self::PASSWORD_VERSION_2:
				$blowfish_salt = self::CRYPT_PREFIX_2 . self::CRYPT_BASE . $salt . self::CRYPT_SUFFIX;
				$blowfish_hash = crypt(sha1(self::INTERNAL_SALT . $password), $blowfish_salt);
				break;
		}
		
		Yii::endProfile('components.identity.PasswordUserIdentity.hash');
		
		return $blowfish_hash;
	}
}