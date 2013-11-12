<?php

class ListsController extends AbstractApiController
{
	protected function getModel()
	{
		return ShoppingList::model();
	}

	protected function createObject()
	{
		return new ShoppingList();
	}

	protected function createAndSaveObject($params)
	{
		$object = parent::createAndSaveObject($params);

		$object->user_id    = self::DEFAULT_USER_ID;
		$object->created_on = new CDbExpression('NOW()');

		return $object;
	}
}