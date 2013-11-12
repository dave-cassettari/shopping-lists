<?php

class AlphaNumeric extends CValidator
{
	private $_basicPattern 			= '/^[a-zA-Z{additionalParams}]{{minChars},{maxChars}}$/';
	private $_numericData 			= '0-9';
	private $_spaces 				= ' \r\n';
	private $_punctuation 			= '\'"-.,\\@;:#~_?!';
	private $_allAccentedLetters 	= 'ÀÁÂÃÄÅAAAÆÇCCCCDÐÈÉÊËEEEEEGGGGHHÌÍÎÏIIIII?JKLLLL?ÑNNN?ÒÓÔÕÖØOOOŒRRRSŠSS?TTT?ÙÚÛÜUUUUUUWÝYŸZŽZàáâãäåaaaæçccccddèéêëeeeeeƒgggghhìíîïiiiii?jk?llll?ñnnn??òóôõöøoooœrrrsšss?ttt?ùúûüuuuuuuwýÿyžzzÞþß?Ðð';
	private $_basicAccentedLetters 	= 'ÀÁÂÃÄAAÈÉÊËEEEÌÍÎÏIIIÒÓÔÕÖOÙÚÛÜUUUàáâãäaaèéêëeeeìíîïiiiòóôõöooùúûüuuu';
	
	public $minChars 			= 0;
	public $maxChars 			= NULL;
	public $numbers 			= TRUE;
	public $spaces 				= TRUE;
	public $punctuation 		= TRUE;
	public $allAccentedLetters 	= FALSE;
	public $accentedLetters 	= TRUE;
	public $extra 				= array();
	public $message 			= '{attribute} contains disallowed characters';
	
	protected function validateAttribute($object, $attribute)
	{
		$pattern 	= $this->pattern();
		$message 	= WebUser::t($this->message, array('{attribute}' => $attribute));
		$value 		= $object->$attribute;
		
		if (!preg_match($pattern, $value))
		{
			$this->addError($object, $attribute, $message);
		}
	}
	
	public function clientValidateAttribute($object, $attribute)
	{
		$pattern 	= $this->pattern();
		$message 	= WebUser::t($this->message, array('{attribute}' => $attribute));
		$condition 	= "!value.match({$pattern})";

		return "
if(".$condition.") {
	messages.push(".CJSON::encode($message).");
}
";
	}
	
	public function pattern()
	{
		$additionalParams = NULL;
		
		if ($this->numbers)
		{
			$additionalParams .= $this->_numericData;
		}
		
		if ($this->spaces)
		{
			$additionalParams .= $this->_spaces;
		}
		
		if ($this->punctuation)
		{
			$additionalParams .= $this->_punctuation;
		}
		
		if ($this->allAccentedLetters)
		{
			$additionalParams .= $this->_allAccentedLetters;
		}
		else if ($this->accentedLetters)
		{
			$additionalParams .= $this->_basicAccentedLetters;
		}
		
		if (count($this->extra))
		{
			$additionalParams .= implode('\\', $this->extra);
		}
		
		return str_replace(array('{additionalParams}', '{minChars}', '{maxChars}'), array($additionalParams, $this->minChars, $this->maxChars), $this->_basicPattern);
	}
}
