<?php

$prefix = isset($prefix) ? $prefix : '';
$suffix = isset($suffix) ? $suffix : '';
$slider = array(
	'min' 	=> $min,
	'max' 	=> $max,
	'step' 	=> $step,
	'input' => '#' . $form->id($attribute),
	'value' => $form->value($attribute),
);

?>
<div class="clear slider-container">
	<div class="slider-input">
		<?php if ($prefix) { ?>
		<p class="prefix"><?php echo $prefix; ?></p>
		<?php } ?>
		<?php if ($suffix) { ?>
		<p class="suffix"><?php echo $suffix; ?></p>
		<?php } ?>
		<?php echo $form->textField($model, $attribute, $options); ?>
	</div>
	<div <?php Yii::app()->getController()->clientWidget('slider', $slider); ?>></div>
</div>