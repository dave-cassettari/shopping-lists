<?php

Yii::app()->getClientScript()->registerScriptFile('jquery.htmlarea');

?>
<div <?php echo $this->clientWidget('htmlarea'); ?>>
	<div class="htmlarea-toolbar">
		<a href="#" class="bold" 				title="Bold"></a>
		<a href="#" class="italic" 				title="Italic"></a>
		<a href="#" class="underline" 			title="Underline"></a>
		
		<span class="toolbar-separator"></span>
		
		<a href="#" class="insertorderedlist" 	title="Ordered list"></a>
		<a href="#" class="insertunorderedlist" title="Unordered list"></a>
		
		<!-- <span class="toolbar-separator"></span>
		
		<a href="#" class="justifyLeft" 		title="Justify Left"></a>
		<a href="#" class="justifyCenter" 		title="Justify Center"></a>
		<a href="#" class="justifyRight" 		title="Justify Right"></a> -->
		
		<span class="toolbar-separator"></span>
		
		<a href="#" class="link" 				title="Insert Link"></a>
		<a href="#" class="unlink" 				title="Remove Link"></a>
	</div>
	<?php
	
	echo $form->textArea($model, $attribute, $options + array('placeholder' => $label));
	
	?>
	<div class="htmlarea-editor" contenteditable="true"></div>
</div>