<?php

$this->widget('application.extensions.recaptcha.ReCaptcha',  array(
	'model' 	=> $model,
	'attribute' => $attribute,
	'theme' 	=> param('captcha.theme'),
	'language' 	=> param('captcha.language'),
	'publicKey' => param('captcha.publicKey'),
));

echo $form->error($model, $attribute);