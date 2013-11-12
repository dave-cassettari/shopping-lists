<?php

echo $form->checkBoxList($model, $attribute, $options['options'], array(
	'encode' 	=> FALSE,
	'separator' => '',
	'container' => '',
	'template' 	=> '{input} {label}',
));