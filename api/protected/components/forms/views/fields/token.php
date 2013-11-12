<?php 

$data = array(
	'url' 	=> $options['url'],
	'value' => $form->value($attribute),
);

?>
<div <?php Yii::app()->getController()->clientWidget('tokeninput', $data); ?>>
	<?php echo $form->textField($model, $attribute, $options); ?>
</div>