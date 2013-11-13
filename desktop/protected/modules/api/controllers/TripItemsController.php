<?php

class TripItemsController extends AbstractApiController
{
	protected function getModel()
	{
		return TripItem::model();
	}

	protected function createObject()
	{
		return new TripItem;
	}

	protected function getExistingObject(array $params)
	{
		list($trip, $item) = $this->getTripAndItem($params);

		if (!$trip || !$item)
		{
			return NULL;
		}

		return TripItem::retrieve($trip, $item);
	}

	protected function createAndSaveObject($params)
	{
		list($trip, $item) = $this->getTripAndItem($params);

		if (!$trip || !$item)
		{
			throw new CHttpException(422, 'Required: trip, list');
		}

		$complete = FALSE;

		if (isset($params['complete']))
		{
			$complete = boolval($params['complete']);
		}

		return TripITem::create($trip, $item, $complete);
	}

	private function getTripAndItem(array $params)
	{
		if (!isset($params['trip']) || !isset($params['item']))
		{
			return NULL;
		}

		$trip_id = intval($params['trip']);
		$item_id = intval($params['item']);

		$trip = Trip::getFromID($trip_id);
		$item = Item::getFromID($item_id);

		return array($trip,
			$item
		);
	}
}