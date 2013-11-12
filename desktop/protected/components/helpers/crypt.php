<?php

function encrypt($decrypted, $password, $salt)
{
	$key = hash('SHA256', $salt . $password, TRUE);
	
	srand();
	
	// build $iv and $iv_base64. Block size of 128 bits (AES compliant) and CBC mode
	$iv = mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC), MCRYPT_RAND);
	
	if (strlen($iv_base64 = rtrim(base64_encode($iv), '=')) != 22)
	{
		return FALSE;
	}
	
	// encrypt plaintext and an MD5 of plaintext using key. MD5 is just to verify successful decryption
	$encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $decrypted . md5($decrypted), MCRYPT_MODE_CBC, $iv));
	
	return $iv_base64 . $encrypted;
}

function decrypt($encrypted, $password, $salt)
{
	$key = hash('SHA256', $salt . $password, TRUE);
	
	// retrieve $iv which is the first 22 characters plus ==, base64_decoded.
	$iv = base64_decode(substr($encrypted, 0, 22) . '==');
	
	// remove $iv from $encrypted.
	$encrypted = substr($encrypted, 22);
	
	// decrypt the data. rtrim won't corrupt the data because the last 32 characters are the MD5 hash; thus any \0 character has to be padding.
	$decrypted = rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, base64_decode($encrypted), MCRYPT_MODE_CBC, $iv), "\0\4");
	
	// retrieve $hash which is the last 32 characters of $decrypted.
	$hash = substr($decrypted, -32);
	
	// remove the last 32 characters from $decrypted.
	$decrypted = substr($decrypted, 0, -32);
	
	// integrity check.
	if (md5($decrypted) != $hash)
	{
		return FALSE;
	}
	
	return $decrypted;
}