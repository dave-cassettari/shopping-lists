<?php

class HtmlValidator extends CValidator
{
	public $options 	= array();
	public $removeUtf 	= TRUE;
	public $parseUrls 	= FALSE;
	
	protected function validateAttribute($object, $attribute)
	{
		$value 				= $object->$attribute;
		$filter 			= new CHtmlPurifier;
		$filter->options 	= CMap::mergeArray(param('purifier'), $this->options);
		$object->$attribute = $filter->purify($value);
		
		if ($this->removeUtf)
		{
			$object->$attribute = self::stripUtf($value);
		}
		
		if ($this->parseUrls)
		{
			$object->$attribute = self::parseUrls($value);
		}
	}
	
	public static function stripUtf($string)
	{
		for ($i = 0; $i < strlen($string); $i++)
		{
			if (ord($string[$i]) > 127)
			{
				$string[$i] = ' ';
			}
		}
		
		return $string;
	}
	
	public static function parseUrls($text)
	{
		$regex 	= "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
		$used 	= array();
	
		preg_match_all($regex, $text, $matches);
	
		foreach ($matches[0] as $pattern)
		{
			if (!array_key_exists($pattern, $used))
			{
				$used[$pattern] = TRUE;
	
				$text = str_replace($pattern, '<a href="' . $pattern . '" target="_blank">' . $pattern . '</a> ', $text);
			}
		}
	
		return $text;
	}
}
