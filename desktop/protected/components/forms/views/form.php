<fieldset class='submit <?php echo $class; ?>'>
	<?php if ($honeypot = $this->model->honeypot) { ?>
	<div class='form-extra'>
		<?php echo CHtml::textField($honeypot); ?>
	</div>
	<?php } ?>
	
	<?php if (is_array($help)) { ?>
	<p class='left drop'>
		<a href='<?php echo $help['url']; ?>'><?php echo $help['title']; ?></a>
	</p>
	<?php } ?>
	
	<?php
	
	$options = array();
	
	if ($this->angular)
	{
		$options['data-ng-click'] = 'save()';
	}
	
	echo CHtml::submitButton($this->model->submit(), $options);
	
	?>
</fieldset>