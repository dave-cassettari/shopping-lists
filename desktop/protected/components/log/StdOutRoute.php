<?php

class StdOutRoute extends CLogRoute
{
	public function init()
	{
		Yii::getLogger()->autoFlush = 1;
	}
	
	public function processLogs($logs)
	{
		$stdout = fopen('php://stdout', 'w');
		
		foreach ($logs as $log)
		{
			fwrite($stdout, $log[0] . PHP_EOL);
		}
		
		fclose($stdout);
	}
	
	public function collectLogs($logger, $processLogs = FALSE)
	{
		parent::collectLogs($logger, TRUE);
	}
}