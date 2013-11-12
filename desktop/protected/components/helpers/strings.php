<?php

function money($value, $decimals = 2)
{
	$symbol = param('currency.default.symbol');
	
	if ($value instanceof Money)
	{
		$value = $value->toFloat($decimals);
	}
	
	return $symbol . number_format($value, $decimals);
}

function percentage($value, $decimals = 4, $suffix = '%', $prefix = '')
{
	return $prefix . number_format($value, $decimals) . $suffix;
}

function formatTime($date = NULL)
{
	return formatDate($date, param('format.time'));
}

function formatDateTime($date = NULL)
{
	return formatDate($date, param('format.datetime'));
}

function formatTimestamp($date = NULL)
{
	return formatDate($date, param('format.timestamp'));
}

function formatDate($date = NULL, $format = NULL)
{
	if ($date === NULL)
	{
		$date = time();
	}
	
	if ($format === NULL)
	{
		$format = param('format.date');
	}

	if (!is_numeric($date))
	{
		$date = strtotime($date);
	}

	return date($format, $date);
}

function parseParams($value)
{
	return preg_replace_callback('#\[\[(.*?)\]\]#', function($result)
	{
		$name = $result[1];
			
		return param($name, 'N/A');
	}, $value);
}

function js($value)
{
	return str_replace('\'', '\\\'', $value);
}

function ellipsis($string, $length, $end = '...')
{
	if (strlen($string) > $length)
	{
		$length -= strlen($end);
		$string  = substr($string, 0, $length);
		$string .= $end;
	}

	return $string;
}

function randomString($length)
{
	$chars 	= 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	$size 	= strlen($chars);
	$result = '';

	for ($i = 0; $i < $length; $i++)
	{
	$result .= $chars[rand(0, $size - 1)];
	}

	return $result;
}

function nl2p($value)
{
	return str_replace(array("\r\n", "\n\r", "\n", "\r"), '', nl2br($value)); //'<p>' . str_replace('<br />', '</p><p>', nl2br($value)) . '</p>';
}

function p2nl($string)
{
	return preg_replace('=<br */?>=i', "\n", $string);
}

function startsWith($haystack, $needle)
{
	$length = strlen($needle);

	return (substr($haystack, 0, $length) === $needle);
}

function endsWith($haystack, $needle)
{
	$length = strlen($needle);

	if ($length == 0)
	{
		return true;
	}

	return (substr($haystack, -$length) === $needle);
}

function randomFloat($min = 0.0, $max = 1.0)
{
	return ((float)rand() / (float)getrandmax()) * ($max - $min) + $min;
}

function possessive($string)
{
	return $string .'\''. ($string[strlen($string) - 1] != 's' ? 's' : '');
}

function sharingLinks($title, $image, $url = NULL)
{
	$result 	= '';
	$providers 	= array('facebook', 'twitter', 'linkedin', 'reddit');
	
	foreach ($providers as $provider)
	{
		$options = array(
			'class' 		=> 'social-profile social-profile-' . $provider,
			'target' 		=> '_blank',
			'href' 			=> sharingLink($provider, $title, $image, $url),
			'alt' 			=> 'Share on ' . SocialLinkIdentity::providerName($provider),
			'title' 		=> 'Share on ' . SocialLinkIdentity::providerName($provider),
			'data-provider' => $provider,
		);
		
		$result .= CHtml::tag('a', $options, '&nbsp;');
	}
	
	return $result;
}

function sharingLink($provider, $title, $image, $url = NULL)
{
	if ($url === NULL)
	{
		$url = Yii::app()->getController()->createAbsoluteUrl(Yii::app()->getRequest()->getUrl());
	}
	
	switch ($provider)
	{
		case 'facebook':
			$result = 'https://www.facebook.com/sharer.php?s=100';
	
			if ($url) 	$result .= '&p[url]=' . urlencode($url);
			if ($title) $result .= '&p[title]=' . urlencode($title);
			if ($image) $result .= '&p[images][0]=' . urlencode($image);
		
			return $result;

		case 'twitter':
			$result = 'https://twitter.com/intent/tweet?original_referer=' . urlencode($url) . '&via=investinme';
	
			if ($url) 	$result .= '&url=' . urlencode($url);
			if ($title) $result .= '&text=' . urlencode($title);
		
			return $result;

		case 'linkedin':
			$result = 'http://www.linkedin.com/shareArticle?mini=true&source=' . urlencode($url);
	
			if ($url) 	$result .= '&url=' . urlencode($url);
			if ($title) $result .= '&title=' . urlencode($title);
		
			return $result;
			
		case 'reddit':
			$result = 'http://www.reddit.com/submit?url=' . urlencode($url);
	
			if ($title) $result .= '&title=' . urlencode($title);
	
			return $result;

		default:
			throw new Exception('Unknown Social Network');
	}
}
