<?php

class ActiveForm extends CActiveForm
{
	private $_model;
	private $_fieldsets;
	private $_displayed;
	
	public $index 			= NULL;
	public $show 			= TRUE;
	public $class 			= '';
	public $action 			= '';
	public $method 			= 'post';
	public $angular 		= NULL;
	public $class_submit 	= '';
	public $errorCssClass;
	public $successCssClass;
	public $validatingCssClass;
	
	public function __construct()
	{
		Yii::import('application.components.forms.ActiveFormField');
		Yii::import('application.components.forms.ActiveFormFieldset');
	}
	
	public function init()
	{
		$this->id = 'active-form-' . rand();
		
		if (!$this->action)
		{
			$this->action = Yii::app()->getRequest()->getUrl();
		}
		
		CHtml::$errorCss = 'input-error';
		
		$this->clientOptions = CMap::mergeArray(array(
			'errorCssClass' 	=> 'input-error',
			'successCssClass' 	=> 'input-success',
			
		), $this->clientOptions);
		
		$this->htmlOptions = CMap::mergeArray(array(
			'class' 		=> $this->class,
			'method' 		=> $this->method,
			'action' 		=> $this->action,
			'enctype' 		=> 'multipart/form-data',
			
		), $this->htmlOptions);
		
// 		$this->htmlOptions['class'] 		= $this->class;
// 		$this->htmlOptions['method'] 		= $this->method;
// 		$this->htmlOptions['action'] 		= $this->action;
// 		$this->htmlOptions['enctype'] 		= 'multipart/form-data';
// 		$this->htmlOptions['errorCssClass'] = 'input-error';
		
		if ($this->angular)
		{
			//$this->htmlOptions['data-iim-stop-event'] = 'submit';
		}
		
		parent::init();
		
		$this->enableAjaxValidation		= FALSE;
		$this->enableClientValidation 	= FALSE;
		$this->clientOptions 			= array(
			'validateOnSubmit' 	=> FALSE,
			'validateOnChange' 	=> FALSE,
			'validateOnType' 	=> FALSE, 
		);
		$this->errorMessageCssClass 	= 'error';
		$this->errorCssClass 			= 'ajax-error';
		$this->successCssClass 			= 'ajax-success';
		$this->validatingCssClass 		= 'is-validating';
	}
	
	public function setModel(AbstractFormModel $model)
	{
		$this->_model 		= $model;
		$this->_fieldsets 	= array();
		$this->_displayed 	= array();
		
		$fields = $model->fields();
		
		foreach ($fields as $label => &$content)
		{
			$fieldset = new ActiveFormFieldset($model, $label, $content);
				
			$this->_fieldsets[$label] = $fieldset;
		}
	}
	
	public function getModel()
	{
		return $this->_model;
	}
	
	public function run()
	{
		if ($this->show)
		{
			$this->show();
		}
		
		$data = array(
			'id' 	=> $this->id,
			'help' 	=> $this->model->help(),
			'class' => $this->class_submit,
		);
		$this->render('form', $data);
		
		parent::run();
	}
	
	public function fieldset($name)
	{
		return $this->_fieldsets[$name];
	}
	
	public function fields($fields, $label = TRUE)
	{
		if (!is_array($fields))
		{
			$fields = array($fields);
		}
		
		foreach ($this->_fieldsets as $fieldset)
		{
			foreach ($fieldset->fields() as $name => $field)
			{
				if (in_array($name, $fields))
				{
					$field->display($this, $label);
					
					$fieldset->displayed($name);
				}
			}
		}
	}
	
	public function summary()
	{
		$summary = CHtml::errorSummary($this->model, NULL, NULL, array());
		
		if (!$summary)
		{
			return FALSE;
		}
		
		return $summary;
	}
	
	public function show(array $params = array())
	{
		if (!$this->model)
		{
			echo 'Init not called';
			return;
		}
		
		extend($params, 'fields', array());
		extend($params, 'fieldsets', array());
		
		$fields 	= $params['fields'];
		$fieldsets 	= $params['fieldsets'];
		
		if (!is_array($fields))
		{
			$fields = array($fields);
		}
		if (!is_array($fieldsets))
		{
			$fieldsets = array($fieldsets);
		}
		
		foreach ($this->_fieldsets as $label => $fieldset)
		{
			if (in_array($label, $this->_displayed))
			{
				continue;
			}
				
			if (sizeof($fieldsets) > 0 && !in_array($label, $fieldsets))
			{
				continue;
			}
			
			if ($fieldset->display($this, $fields))
			{
				$this->_displayed[] = $label;
			}
		}
	}
	
	public function id($attribute)
	{
		return CHTML::activeId($this->model, $attribute);
	}
	
	public function name($attribute)
	{
		return CHTML::activeName($this->model, $attribute);
	}
	
	public function attribute_label($attribute)
	{
		return CHTML::activeLabel($this->model, $attribute);
	}
	
	public function value($attribute)
	{
		return CHTML::resolveValue($this->model, $attribute, NULL);
	}
}
