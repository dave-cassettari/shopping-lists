<div <?php Yii::app()->getController()->clientWidget('datepicker'); ?>>
	<?php
	
	echo $form->textField($model, $attribute, $options + array('placeholder' => $label));
	
	?>
</div>