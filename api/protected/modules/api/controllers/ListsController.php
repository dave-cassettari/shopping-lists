<?php

class ListsController extends AbstractApiController
{
	protected function getModel()
	{
		return ShoppingList::model();
	}
}