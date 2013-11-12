<?php 

$data = array(
	'url' => $options['url'],
);

$value = json_decode($form->value($attribute));

if ($value && isset($value->label) && isset($value->value))
{
	$data['label'] = $value->label;
	$data['value'] = $value->value;
	
	$model->$attribute = $value->label;
}
else
{
	$model->$attribute = NULL;
}

?>
<div <?php Yii::app()->getController()->clientWidget('autocomplete', $data, 'search'); ?>>
	<?php echo $form->textField($model, $attribute, $options); ?>
</div>