<?php

function formatDateForForm($date)
{
	return date('d/m/Y', strtotime($date));
}

function formatDateForDatabase($date)
{
	// replace / with - to force date to be parsed from European format
	return date('Y-m-d', strtotime(str_replace('/', '-', $date)));
}

function interval($timestamp)
{
	$date = new DateTime($timestamp);
	
	return $date->diff(new DateTime('now'));
}

function since($timestamp, $prefix = 'Since ', $suffix = '', $now = 'Just Now')
{
	$interval = interval($timestamp);
	
	if ($interval->y > 0)
	{
		if ($interval->y == 1)
		{
			return $interval->format($prefix . '%y year' . $suffix);
		}
		
		return $interval->format($prefix . '%y years' . $suffix);
	}
	
	if ($interval->m > 0)
	{
		if ($interval->m == 1)
		{
			return $interval->format($prefix . '%m month' . $suffix);
		}
		
		return $interval->format($prefix . '%m months' . $suffix);
	}
	
	if ($interval->d > 0)
	{
		if ($interval->d == 1)
		{
			return $interval->format($prefix . '%d day' . $suffix);
		}
		
		return $interval->format($prefix . '%d days' . $suffix);
	}
	
	if ($interval->h > 0)
	{
		if ($interval->h == 1)
		{
			return $interval->format($prefix . '%h hour' . $suffix);
		}
		
		return $interval->format($prefix . '%h hours' . $suffix);
	}
	
	if ($interval->i > 0)
	{
		if ($interval->i == 1)
		{
			return $interval->format($prefix . '%i minute' . $suffix);
		}
		
		return $interval->format($prefix . '%i minutes' . $suffix);
	}
	
	return $now;
}

function midnight($time)
{
	return $time - ($time % 86400);
}

function nextMidnight($time)
{
	return midnight($time) + 86400 - 60;
}

function nextday($time)
{
	return midnight($time) + 86400;
}