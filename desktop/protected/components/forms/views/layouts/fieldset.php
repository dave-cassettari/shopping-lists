<?php

if (isset($visible) && !$visible)
{
	$class .= ' hide';
}

?>
<fieldset>
	<?php if ($show) { ?>
	<legend><?php echo $legend; ?></legend>
	<?php } ?>
	
	<?php echo $content; ?>
</fieldset>