<?php

Yii::app()->getClientScript()->registerCssFile('/css/compiled/style.css', 'all');

?>
<!DOCTYPE html>
<!--[if lt IE 7]>
<html class='lt-ie9 lt-ie8 lt-ie7'> <![endif]-->
<!--[if IE 7]>
<html class='lt-ie9 lt-ie8'> <![endif]-->
<!--[if IE 8]>
<html class='lt-ie9'> <![endif]-->
<!--[if gt IE 8]><!-->
<html class=''> <!--<![endif]-->
<head>
	<title><?php echo $this->pageTitle . param('page.title.separator') . Yii::app()->name; ?></title>

	<meta charset='UTF-8'>
	<meta http-equiv='X-UA-Compatible' content='IE=edge, chrome=1'>
	<meta name='viewport'
	      content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0'>

	<link rel='shortcut icon' href='/favicon.ico' type='image/x-icon'>
	<link rel='icon' href='/favicon.ico' type='image/x-icon'>

	<link rel='stylesheet' type='text/css' href='//fonts.googleapis.com/css?family=Open+Sans:300,600|Lobster+Two'>

	<!--[if lt IE 9]>
	<script src='/js/vendor/html5shiv.js'></script>
	<![endif]-->
</head>
<body class='is-loading'>

<?php echo $content; ?>

<div class='message-container'>
	<div class='container'>
		<?php

		foreach (WebUser::flashes() as $type => $message)
		{
			?>
			<p class='message-<?php echo $type; ?>'><?php echo $message; ?></p>
		<?php
		}

		?>
	</div>
</div>

</body>
</html>