<?php

class ActiveFormFieldset extends AbstractWidget
{
	private $_label;
	private $_shown 	= FALSE;
	private $_fields 	= array();
	private $_displayed = array();
	
	public function __construct(AbstractFormModel $model, $label, array $fieldset)
	{
		$this->_label = $label;
		
		$this->parse($model, $fieldset);
	}
	
	public function fields()
	{
		return $this->_fields;
	}
	
	public function field($name)
	{
		return $this->_fields[$name];
	}
	
	public function displayed($name)
	{
		$this->_displayed[] = $name;
	}
	
	public function parse(AbstractFormModel $model, $fieldset)
	{
		foreach ($fieldset as $name => &$params)
		{
			extend($params, 'type',  	'text');
			extend($params, 'options', 	array());
			extend($params, 'desc', 	FALSE);
			
			$field = new ActiveFormField($model, $name, $params);
			
			$this->_fields[$name] = $field;
		}
	}
	
	public function display(CActiveForm $form, array $names = array(), $return = FALSE)
	{
		if (sizeof($this->_displayed) == sizeof($this->_fields))
		{
			return FALSE;
		}
		
		$content = '';
		
		foreach ($this->_fields as $name => $field)
		{
			if (in_array($name, $this->_displayed))
			{
				continue;
			}
			
			if (sizeof($names) > 0 && !in_array($name, $names))
			{
				continue;
			}
			
			$content .= $field->display($form, TRUE);
			
			$this->_displayed[] = $name;
		}
		
		$data = array(
			'legend' 	=> $this->_label,
			'show' 		=> !$this->_shown,
			'content' 	=> $content,
		);
		
		$this->_shown = TRUE;
		
		return $this->render('layouts/fieldset', $data, $return);
	}
}
