<div class="input-wrapper input-<?php echo $this->field_type; ?>">
	<?php
	
	echo $form->label($model, $attribute);
	
	?>
	<span class="input-container">
		<?php
		
		echo $content;
		echo $form->error($model, $attribute);
		
		if ($desc)
		{
			echo '<p class="desc">' . $desc . '</p>';
		}
		
		?>
	</span>
</div>