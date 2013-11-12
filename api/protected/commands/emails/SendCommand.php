<?php

class SendCommand extends AbstractCommand
{
	public function actionIndex()
	{
		$this->actionSend();
	}
	
	public function actionSend()
	{
		$queue 	= EmailQueue::all();
		$total 	= sizeof($queue);
		$sent 	= array();
		
		if ($total == 0)
		{
			self::log('No emails in queue', CLogger::LEVEL_TRACE);
			
			return;
		}
		
		self::log("Sending $total email(s)", CLogger::LEVEL_TRACE);

		foreach ($queue as $item)
		{
			$email 	= $item->email();
			$result = $this->send($email);
			
			if ($result)
			{
				$item->pop();
			}
		}
	}
	
	private function send(Email $email)
	{
		Yii::import('ext.mail.MailMessage');
		
		$to 		= array();
		$from 		= array();
		$sender 	= $email->getSender();
		$message 	= new MailMessage;
		
		if (!filter_var($sender->address, FILTER_VALIDATE_EMAIL))
		{
			foreach ($email->allRecipients() as $emailAddress)
			{
				$emailAddress->failed();
			}
		
			return TRUE;
		}
		
		if ($sender->name)
		{
			$from[$sender->address] = $sender->name;
		}
		else
		{
			$from[] = $sender->address;
		}
		
		foreach ($email->allRecipients() as $emailAddress)
		{
			if (!filter_var($emailAddress->address, FILTER_VALIDATE_EMAIL))
			{
				$emailAddress->failed();
				
				continue;
			}
			
			if ($emailAddress->name)
			{
				$to[$emailAddress->address] = $emailAddress->name;
			}
			else
			{
				$to[] = $emailAddress->address;
			}
		}
		
		if (sizeof($to) == 0 || sizeof($from) == 0)
		{
			return TRUE;
		}
		
		$message->setTo($to);
		$message->setFrom($from);
		$message->setSubject($email->subject);
		$message->setBody($email->body, 'text/html');
		$message->setReturnPath($email->getReturnPath());
		
		return Yii::app()->mail->send($message);
	}
}