<div class="radios">
	<?php echo $form->radioButtonList($model, $attribute, $options['options'], array(
		'encode' 	=> FALSE,
		'tempalte' 	=> '{label}{input}',
	)); ?>
</div>