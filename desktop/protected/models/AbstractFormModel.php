<?php

abstract class AbstractFormModel extends CFormModel
{
	const LENGTH_TEXT 		= AbstractActiveRecord::LENGTH_TEXT;
	const LENGTH_MEDIUMTEXT = AbstractActiveRecord::LENGTH_MEDIUMTEXT;
	const LENGTH_VARCHAR 	= AbstractActiveRecord::LENGTH_VARCHAR;
	const LENGTH_TELEPHONE 	= AbstractActiveRecord::LENGTH_TELEPHONE;
	const LENGTH_POSTCODE 	= AbstractActiveRecord::LENGTH_POSTCODE;
	const LENGTH_COUNTRY 	= AbstractActiveRecord::LENGTH_COUNTRY;

	public abstract function fields();
	public abstract function submit();

	public function modelValidators()
	{
		return array();
	}

	public function createValidators()
	{
		$result = parent::createValidators();
		
		foreach ($this->modelValidators() as $model)
		{
			$result->mergeWith($this->useModelValidators($model));
		}

		return $result;
	}

	public function run(callable $callback, $ignore_ajax = FALSE)
	{
		$name = get_class($this);
		$ajax = Yii::app()->getController()->isAjax();
		
		if (!$_POST)
		{
			if (array_key_exists('CONTENT_TYPE', $_SERVER) && stripos($_SERVER['CONTENT_TYPE'], 'application/json') === 0)
			{
				$_POST = json_decode(file_get_contents('php://input'), TRUE);
			}
		}
		
		if (!isset($_POST[$name]))
		{
			return FALSE;
		}

		$data 		= $_POST[$name];
		$errors 	= array();
		$success 	= TRUE;

		$this->attributes = $data;
		
		if ($this->validate())
		{
			$success = $callback(Yii::app()->getController()->getAction());
		}
		else
		{
			$errors += $this->getErrors();
		}

		if ($ajax && !$ignore_ajax)
		{
			if (sizeof($errors) > 0)
			{
				$data = array(
					'errors' => $this->getErrors(),
				);
				
				echo json_encode($data);
				
				Yii::app()->end();
			}
// 			else
// 			{
// 				$data = array(
// 					'success' => $success,
// 				);
// 			}

// 			echo json_encode($data);

// 			Yii::app()->end();
		}
		
		if ($errors)
		{
			return $this->getErrors();
		}

		return $success;
	}

	public function attributeLabels()
	{
		$labels = array();
		$fields = $this->fields();

		foreach ($fields as $fieldset)
		{
			foreach ($fieldset as $name => $params)
			{
				$labels[$name] = $params[0];
			}
		}

		return $labels;
	}

	public function label($attribute)
	{
		foreach ($this->fields() as $fieldset)
		{
			foreach ($fieldset as $name => $params)
			{
				if ($name == $attribute)
				{
					return $params[0];
				}
			}
		}

		return NULL;
	}

	protected function id($name)
	{
		return strtolower(str_replace(' ', '-', $name));
	}

	public function help()
	{
		return NULL;
	}

	protected function filter_purifier()
	{
		return array(new CHtmlPurifier(param('htmlpurifier')), 'purify');
	}
	
	public function behaviors()
	{
		return CMap::mergeArray(parent::behaviors(), array(
			'antispam' => array(
				'class' 	=> 'application.behaviours.forms.AntiSpamBehaviour',
				'honeypot' 	=> param('honeypot.field'),
				'message' 	=> 'Your message was classified as spam. Please contact us if you think this was done by mistake.',
			)
		));
	}
	
	public function __get($value)
	{
		if ($value == param('honeypot.field'))
		{
			return NULL;
		}
		
		return parent::__get($value);
	}
	
	private function useModelValidators(AbstractActiveRecord $model)
	{
		$result = new CList();

		foreach ($this->attributeNames() as $attribute)
		{
			$validators = $model->getValidators($attribute);
				
			foreach ($validators as $validator)
			{
				$validator->attributes = array_intersect($validator->attributes, $this->attributeNames());

				$result->add($validator);
			}
		}

		return $result;
	}
}