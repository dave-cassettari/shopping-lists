<?php

abstract class AbstractApiController extends AbstractController
{
	const DEFAULT_USER_ID = 1;

	public function actionIndex()
	{
		$result = NULL;
		$model  = $this->getModel();
		$class  = $this->getClassName($model);

		switch ($_SERVER['REQUEST_METHOD'])
		{
			case 'GET':
				$params = $_GET;

				if (empty($_GET))
				{
					$result = $this->getAllObjects($params);
				}
				else
				{
					$result = $this->getExistingObject($params);

					if (!$result)
					{
						throw new CHttpException(404);
					}
				}
				break;

			case 'PUT':
				$params = $this->getRestParams($class);
				$result = $this->getExistingObject($params);

//				var_Dump($params);

				if (!$result)
				{
					throw new CHttpException(404);
				}

				foreach ($params as $name => $value)
				{
					if ($result->hasAttribute($name))
					{
						$result->setAttribute($name, $value);
					}
				}

				$result->save();

				break;

			case 'POST':
				$params = $this->getRestParams($class);
				$result = $this->createAndSaveObject($params);

				if ($result->validate())
				{
					$result->save();
				}
				break;

			case 'DELETE':
				$params = $this->getRestParams($class);
				$result = $this->getExistingObject($params);

				if (!$result)
				{
					throw new CHttpException(404);
				}

				$result->delete();

				$result = array();

				break;
		}

		if (is_object($result))
		{
			if ($result instanceof AbstractActiveRecord && $result->hasErrors())
			{
				http_response_code(422);

				$result = array(
//					$this->getClassName($result) => array(
					'apiErrors' => $result->getErrors(),
//					),
				);
			}
			else
			{
				$result = array(
					$this->getClassName($result) => $result
				);
			}
		}
		else if (is_array($result))
		{
			$model  = $this->getModel();
			$class  = $this->getClassName($model);
			$plural = self::makePlural($class);
			$result = array(
				$plural => $result,
			);
		}

		echo json_encode($result, JSON_PRETTY_PRINT);

		Yii::app()->end();
	}

	public static function makePlural($singular)
	{
		return $singular . 's';
	}

	/**
	 * @return AbstractActiveRecord
	 */
	protected abstract function getModel();

	/**
	 * @return AbstractActiveRecord
	 */
	protected abstract function createObject();

	protected function getAllObjects(array $params)
	{
		$model    = $this->getModel();
		$criteria = new CDbCriteria();

		if (isset($params['limit']))
		{
			$criteria->limit = intval($params['limit']);
		}

		if (isset($params['offset']))
		{
			$criteria->offset = intval($params['offset']);
		}

		return $model->findAll($criteria);
	}

	protected function createAndSaveObject($params)
	{
		$object    = $this->createObject();
		$relations = $object->relations();

		foreach ($params as $name => $value)
		{
			if ($object->hasAttribute($name))
			{
				$object->setAttribute($name, $value);
			}

			foreach ($relations as $relation => $config)
			{
				if ($relation != $name)
				{
					continue;
				}

				$type = $config[0];

				switch ($type)
				{
					case AbstractActiveRecord::BELONGS_TO:
						$attribute = $relation . '_id';

						$object->setAttribute($attribute, $value);
						break;
				}
			}
		}

		return $object;
	}

	protected function getExistingObject(array $params)
	{
		$model = $this->getModel();

		if (isset($params['id']))
		{
			$id = intval($params['id']);

			return $model::getFromID($id);
		}

		$multiple = FALSE;
		$criteria = new CDbCriteria();

		foreach ($params as $name => $value)
		{
			if (is_array($value))
			{
				foreach ($value as &$value_item)
				{
					$value_item = strval($value_item);
				}

				$multiple = TRUE;
				$column   = rtrim($name, 's');

				$criteria->addInCondition($column, $value);
			}
			else
			{
				$criteria->addCondition("$name = :$name");

				$criteria->params[$name] = strval($value);
			}
		}

		if ($multiple)
		{
			return $model->findAll($criteria);
		}

		return $model->find($criteria);
	}

	private function getRestParams($child = NULL)
	{
		$params = is_array($_GET) ? $_GET : array();

		if (empty($_POST))
		{
			$json  = file_get_contents('php://input');
			$array = json_decode($json, TRUE);

			if (is_array($array))
			{
				$params = CMap::mergeArray($params, $array);
			}
		}

		if ($child !== NULL)
		{
			if (!isset($params[$child]))
			{
				$params[$child] = array();
			}

			foreach ($params as $name => $value)
			{
				if ($name == $child || isset($params[$child][$name]))
				{
					continue;
				}

				$params[$child][$name] = $value;
			}

			$params = $params[$child];
		}

		return $params;
	}

	private function getClassName($object)
	{
		$class = get_class($object);

		switch ($class)
		{
			case 'ShoppingList':
				return 'list';

			default:
				return strtolower($class);
		}
	}
}