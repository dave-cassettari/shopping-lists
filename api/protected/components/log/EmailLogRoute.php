<?php

class EmailLogRoute extends CEmailLogRoute
{
	protected function sendEmail($email, $subject, $message)
	{
		$from = $this->getSentFrom();
		
		if ($from === NULL)
		{
			$from = param('email.addresses.admin');
		}
		
		return Email::send($subject, $message, $email, NULL, $from);
	}
}