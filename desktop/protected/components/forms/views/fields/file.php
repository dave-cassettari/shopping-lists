<?php

Yii::app()->getClientScript()->registerScriptFile('transloadit');

$template 	= isset($options['template']) ? $options['template'] : param('transloadit.templates.profile');
$redirect 	= isset($options['redirect']) ? $options['redirect'] : Yii::app()->getRequest()->getUrl();
$redirect 	= Yii::app()->getController()->createAbsoluteUrl($redirect);
$expires 	= date('Y/m/d H:i:s+00:00', time() + 60 * 10);

$params = array(
	'template_id' 	=> $template,
	'redirect_url' 	=> $redirect,
	'auth' 			=> array(
		'key' 			=> param('transloadit.api-key'),
		'expires' 		=> $expires,
	),
);

$json 		= json_encode($params);
$signature 	= hash_hmac('sha1', $json, param('transloadit.api-secret'));

?>
<div class="upload">
	<input type="hidden" name="params" value="<?php echo htmlentities($json); ?>" />
	<input type="hidden" name="signature" value="<?php echo $signature; ?>" />
	
	<?php
	
	echo $form->fileField($model, $attribute, $options);
	
	?>
	
	<span class="progress">
		<span class="progress complete" style="width: 0">&nbsp;</span>
	</span>
	
	<span class="upload-message">&nbsp;</span>
</div>

<script type="text/javascript">

_queue.push(function()
{
	var $message 	= $('.upload-message'),
		$progress 	= $('.progress .complete'),
		$input 		= $('#<?php echo $form->id($attribute); ?>'),
		$submit 	= $input.parents('form').children(':submit');
	
	$input.parents('form').transloadit(
	{
		wait 		: true,
		debug 		: true,
		modal 		: false,
		onStart 	: function(assembly)
		{
			$submit.attr('disabled', 'disabled');
			$message.removeClass('upload-message-error, upload-message-success').text('Uploading').show();
		},
		onProgress 	: function(bytesReceived, bytesExpected)
		{
			var percent = 0;

			if (bytesExpected > 0)
			{
				percent = bytesReceived / bytesExpected * 100;
			}
			
			$message.text('Uploading: ' + percent.toFixed(0) + '%');
			$progress.width(percent + '%');
		},
		onUpload 	: function(upload)
		{
			$message.addClass('upload-message-success').text('Uploaded. Processing, please wait.');
		},
		onError 	: function(assembly)
		{
			$submit.removeAttr('disabled');
			$message.addClass('upload-message-error').text(assembly.message);
			
			$.error(assembly);
		},
	});
});

</script>