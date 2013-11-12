<h1>Whoops!</h1>

<div class='error'>
	<p>Error Code: <?php echo $code; ?></p>

	<p><?php echo CHtml::encode($message); ?></p>
</div>

<?php if (defined('YII_DEBUG') && YII_DEBUG === TRUE)
{
	?>
	<div class='toggle'>

		<h3>Additional Error Details</h3>

		<h4>File</h4>

		<p><?php echo CHtml::encode($file); ?></p>

		<h4>Line</h4>

		<p><?php echo CHtml::encode($line); ?></p>

		<h4>Trace</h4>
		<?php

		$lines = array_slice(explode('#', $trace), 1);

		?>
		<ul>
			<?php foreach ($lines as $line)
			{
				?>
				<li><?php echo CHtml::encode($line); ?></li>
			<?php } ?>
		</ul>

	</div>
<?php } ?>