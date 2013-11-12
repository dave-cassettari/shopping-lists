<?php

class ActiveFormField extends AbstractWidget
{
	const LAYOUT = 'field';

	public $field_type;
	
	private $_model;
	private $_label;
	private $_params;

	public function __construct(AbstractFormModel $model, $label, array $params)
	{
		$this->_model 	= $model;
		$this->_label 	= $label;
		$this->_params 	= $params;

		CHtml::$errorMessageCss = 'error';
	}

	public function display(CActiveForm $form, $return = FALSE)
	{
		$this->field_type = $this->_params['type'];

		CHtml::$afterRequiredLabel = '<span class="required">required</span>';
		
		$label = $this->_label;
		
		if ($form->index !== NULL)
		{
			$label = '[' . $form->index . ']' . $label;
		}
		
		$data = CMap::mergeArray(array(
			'form' 					=> $form,
			'model' 				=> $this->_model,
			'attribute' 			=> $label,
			'label' 				=> $this->_params[0],
			'description' 			=> '',
			'options' 				=> array(),
			'errorCssClass' 		=> $form->errorCssClass,
			'successCssClass' 		=> $form->successCssClass,
			'validatingCssClass' 	=> $form->validatingCssClass,
		), $this->_params);
		
		if ($form->angular)
		{
			$data['options']['data-ng-model'] = $form->angular;// . '.' . $label;
		}
		
		$view = 'text';
		
		switch ($this->field_type)
		{
			case 'date':
			case 'file':
			case 'range':
			case 'radio':
			case 'month':
			case 'hidden':
			case 'captcha':
			case 'password':
			case 'checkbox':
				$view = $this->field_type;
				break;
			
			case 'textarea':
				$value = $form->value($label);
				
				if ($value)
				{
					$this->_model->$label = p2nl($value);
				}
				
				$view = 'textarea';
				break;

			case 'checkbox-list':
				$data['options'] = CMap::mergeArray($data['options'], array(
					'separator' => '',
					'options' 	=> $this->_params['options'],
				));

				$view = 'checkbox-list';
				break;
			
			case 'radio-list':
				$data['options'] = CMap::mergeArray($data['options'], array(
					'separator' => '',
					'options' 	=> $this->_params['options'],
				));

				$view = 'radio-list';
				break;

			case 'select':
				$data['options'] = CMap::mergeArray($data['options'], array(
					'options' => $this->_params['options'],
				));

				$view = 'select';
				break;
					
			case 'autocomplete':
				$data['options'] = CMap::mergeArray($data['options'], array(
					'url' => $this->_params['url'],
				));

				$view = 'autocomplete';
				break;
				
			case 'token':
				$data['options'] = CMap::mergeArray($data['options'], array(
					'url' => $this->_params['url'],
				));

				$view = 'token';
				break;
		}
		
		$data['type'] = $view;
		
		return $this->render('fields/' . $view, $data, $return, self::LAYOUT);
	}
}
