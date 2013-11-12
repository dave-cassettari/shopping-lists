<?php

abstract class AbstractApiController extends AbstractController
{
	public function actionIndex()
	{
		$result = NULL;

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
				$params = Yii::app()->getRequest()->getRestParams();
				$result = $this->getExistingObject($params);

				if (!$result)
				{
					throw new CHttpException(404);
				}

				var_dump($_REQUEST);
				exit;
				break;

			case 'POST':
				$params = $_POST;
				break;

			case 'DELETE':
				$params = Yii::app()->getRequest()->getRestParams();
				$result = $this->getExistingObject($result);

				if (!$result)
				{
					throw new CHttpException(404);
				}

				$result->delete();

				break;
		}

		echo json_encode($result);

		Yii::app()->end();
	}

	/**
	 * @return AbstractActiveRecord
	 */
	protected abstract function getModel();

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

	protected function getExistingObject(array $params)
	{
		$model = $this->getModel();

		if (isset($params['id']))
		{
			$id = intval($params['id']);

			return $model::getFromID($id);
		}

		$criteria = new CDbCriteria();

		foreach ($params as $name => $value)
		{
			$criteria->addCondition("$name = :$name");

			$criteria->params[$name] = strval($value);
		}

		return $model->find($criteria);
	}
}