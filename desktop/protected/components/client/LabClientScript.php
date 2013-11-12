<?php

class LabClientScript extends ClientScript
{
	public $critical 	= array();
	public $important 	= array();
	
	public function init()
	{
		parent::init();
	}
	
	public function renderBodyEnd(&$output)
	{
		if (!isset($this->scriptFiles[self::POS_END]))
		{
			return;
		}
	
		$fullPage 	= 0;
		$output 	= preg_replace('/(<\\/body\s*>)/is','<###end###>$1', $output, 1, $fullPage);
		$html 		= '';
		
		$this->renderScriptFiles(self::POS_END, $html);
		
		if ($fullPage)
		{
			$output = str_replace('<###end###>',$html,$output);
		}
		else
		{
			$output = $output . $html;
		}
	}
	
	protected function renderScriptFiles($position, &$html)
	{
		if (isset($this->scriptFiles[$position]))
		{
			$scripts 	= $this->scriptFiles[$position];
			$important 	=  $this->important($scripts);
			
// 			$controller = Yii::app()->getController();
// 			$html 		= $html . $controller->renderPartial('application.components.client.views.labjs', $data, TRUE);

			$labjs = '$LAB';
			
			foreach ($scripts as $script)
			{
				$labjs .= ".script('$script')";
				
				if (in_array($script, $important))
				{
					$labjs .= '.wait()';
				}
			}
			
			$labjs 	.= '.wait(function(){ init(); })';
			$html 	.= CHtml::scriptFile($this->map('labjs'));
			$html 	.= CHtml::script($labjs);		
		}
	}
	
	private function important(array $scripts)
	{
		$important = array();
		
		foreach ($this->important as $name)
		{
			$important[] = $this->map($name);
		}
		
		return $important;
	}
	
	private function critical(array $scripts)
	{
		$critical = array();
		
		foreach ($this->critical as &$name)
		{
			$critical[] = $this->map($name);
		}
		
		return $critical;
	}
	
	private function map($name)
	{
		if (isset($this->scriptMap[$name]))
		{
			$name = $this->scriptMap[$name];
		}
		
		return $name;
	}
}