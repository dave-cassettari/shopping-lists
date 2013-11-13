<?php

class ItemsController extends AbstractApiController
{
	protected function getModel()
	{
		return Item::model();
	}

	protected function createObject()
	{
		return new Item;
	}
}