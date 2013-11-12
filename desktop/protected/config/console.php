<?php

return CMap::mergeArray(
		require('main.php'),
		array(
			'import' 		=> array(
				'application.commands.AbstractCommand',
			),
			'commandMap' 	=> array(
				'build-sprites' 			=> array(
					'class' 		=> 'application.commands.build.SpritesCommand',
				),
				'database-backup' 			=> array(
					'class' 		=> 'application.commands.database.BackupCommand',
					'directory' 	=> $protected . '/../database/backups/',
					'connections' 	=> array(
						array(
							'database' 		=> 'db',
							'username' 		=> 'admin',
							'password' 		=> '240b4235ba20609314615fe454f78ce27e4c52b95cc51b7ea6bcd9cb0d5d2cbb',
							'recipients' 	=> array(
								'dave.cassettari@gmail.com',
							),
						),
					),
				),
				'database-archive' 			=> array(
					'class' 		=> 'application.commands.database.ArchiveCommand',
				),
				'database-fixtures' 		=> array(
					'class' 		=> 'application.commands.database.FixturesCommand',
				),
				'database-triggers' 		=> array(
					'class' 		=> 'application.commands.database.TriggersCommand',
				),
				'batch' => array(
					'class' 		=> 'application.commands.BatchManagerCommand',
				),
				'demo-bots' => array(
					'class' 		=> 'application.commands.demo.BotsCommand',
				),
				'demo-social' => array(
					'class' 		=> 'application.commands.demo.SocialRatingCommand',
				),
				'demo-reset' => array(
					'class' 		=> 'application.commands.demo.ResetCommand',
				),
				'notifications-feed' 		=> array(
					'class' 		=> 'application.commands.notifications.FeedCommand',
				),
				'notifications-send' 		=> array(
					'class' 		=> 'application.commands.notifications.SendCommand',
				),
				'notifications-summaries' 	=> array(
					'class' 		=> 'application.commands.notifications.SummariesCommand',
				),
			),
			'behaviors'=>array(
				'viewRenderer' 	=> 'application.behaviours.view.ConsoleViewRendererBehaviour',
			),
			'components' => array(
				'log' => array(
					'class' 	=> 'CLogRouter',
					'routes' 	=> array(
						array(
							'class' 		=> 'application.components.log.StdOutRoute',
							'levels' 		=> 'error, warning, info',
							'categories' 	=> 'application, application.*',
							'except' 		=> 'ext.yii-mail.*',
						),
						array(
							'class' 		=> 'CFileLogRoute',
							'levels' 		=> 'error, warning',
							'filter' 		=> 'CLogFilter',
							'logFile' 		=> 'cron-severe.log',
						),
// 						array(
// 							'class' 		=> 'CFileLogRoute',
// 							'levels' 		=> 'info',
// 							'logFile' 		=> 'cron-info.log',
// 							'except' 		=> 'ext.yii-mail.*',
// 						),
					),
				),
				
				'urlManager' => array(
					'baseUrl' => 'https://www.investinme.co.uk',
				),
				
				'user' => array(
					'class' => 'application.components.user.ConsoleUser',
					'id' 	=> 1,
				),
			),
		)
);
