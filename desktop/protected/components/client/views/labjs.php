<script src="<?php echo $this->map('labjs');?>"></script>
<script>
	$LAB
<?php foreach ($scripts as $script) { ?>
		.script('<?php echo $script; ?>')
<?php if (in_array($script, $important)) { ?>
		.wait()
<?php } ?>
<?php } ?>
		.wait(function()
		{
			init();
		});
</script>
