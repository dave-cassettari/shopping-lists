<?php

class TripsController extends AbstractApiController
{
	protected function getModel()
	{
		return Trip::model();
	}

	protected function createObject()
	{
		return new Trip;
	}

	protected function createAndSaveObject($params)
	{
		$object = parent::createAndSaveObject($params);

		$object->user_id    = self::DEFAULT_USER_ID;
		$object->created_on = new CDbExpression('NOW()');

		return $object;
	}
}