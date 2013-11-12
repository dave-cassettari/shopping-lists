<?php

return array(
	'sourcePath' 	=> dirname(__FILE__) . DIRECTORY_SEPARATOR,
	'messagePath' 	=> dirname(__FILE__) . DIRECTORY_SEPARATOR . 'messages',
	//'translator' 	=> 'WebUser::t',
	'languages' 	=> array('en'),
	'fileTypes' 	=> array('php'),
	'overwrite' 	=> FALSE,
	'exclude' 		=> array(
		'.svn',
		'.gitignore',
		'yiilite.php',
		'yiit.php',
		'/i18n/data',
		'/messages',
		'/vendors',
		'/web/js',
	),
);
