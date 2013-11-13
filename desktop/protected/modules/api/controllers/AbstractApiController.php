<?php

abstract class AbstractApiController extends AbstractController
{
	const ANGULAR         = TRUE;
	const DEFAULT_USER_ID = 1;

	public function actionIndex()
	{
//		$trip = Trip::getFromID(1);
//
//		var_dump($trip->tripItems());exit;

		$result = NULL;
		$model  = $this->getModel();
		$class  = $this->getClassName($model);

		switch ($_SERVER['REQUEST_METHOD'])
		{
			case 'GET':
				$params = $_GET;

				if (!isset($params['id']))
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

				if (!$result)
				{
					throw new CHttpException(404);
				}

				$relations = $result->relations();

				foreach ($params as $name => $value)
				{
					if ($result->hasAttribute($name))
					{
						$result->setAttribute($name, $value);
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

								$result->setAttribute($attribute, $value);
								break;
						}
					}
				}

				if ($result->validate())
				{
					$result->save();
				}
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

		if (!self::ANGULAR)
		{
			if (is_object($result))
			{
				if ($result instanceof AbstractActiveRecord && $result->hasErrors())
				{
					http_response_code(422);

					$result = array(
						'apiErrors' => $result->getErrors(),
					);
				}
				else
				{
					$result = array(
						$this->getClassName($result) => $result
					);
				}
			}
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
		$class    = $this->getClassName($model);
		$plural   = self::makePlural($class);
		$criteria = new CDbCriteria();
		$offset   = NULL;
		$limit    = NULL;

		if (isset($params['offset']))
		{
			$offset = intval($params['offset']);

			unset($params['offset']);
		}

		if (isset($params['limit']))
		{
			$limit = intval($params['limit']);

			unset($params['limit']);
		}

		$criteria->mergeWith($this->getCriteriaFromParams($params));

//		foreach ($params as $name => $value)
//		{
//			$criteria->addCondition()
//		}

		$criteria->offset = $offset;

		$total = $model->count($criteria);

		$criteria->limit = $limit;

		if (self::ANGULAR)
		{
			return $model->findAll($criteria);
		}

		return array(
			$plural => $model->findAll($criteria),
			'meta'  => array(
				'total' => $total,
			),
		);
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
			$id = $params['id'];

			if (!is_array($id))
			{
				return $model::getFromID($id);
			}
		}

		$multiple = FALSE;
		$criteria = $this->getCriteriaFromParams($params, $multiple);

		if ($multiple)
		{
			return $model->findAll($criteria);
		}

		return $model->find($criteria);
	}

	private function getCriteriaFromParams(array $params, &$multiple = FALSE)
	{
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

		return $criteria;
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
				return lcfirst($class);
		}
	}
}