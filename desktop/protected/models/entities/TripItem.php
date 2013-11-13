<?php

class TripItem extends AbstractActiveRecord
{
	public static function create(Trip $trip, Item $item, $complete = FALSE)
	{
		$criteria = self::createCriteria($trip, $item);
		$item     = self::model()->find($criteria);

		if (!$item)
		{
			$item = new self;

			$item->setAttributes($criteria->params);
		}

		return $item->setComplete($complete);
	}

	public static function retrieve(Trip $trip, Item $item)
	{
		$criteria = self::createCriteria($trip, $item);

		return self::model()->find($criteria);
	}

	public static function remove(Trip $trip, Item $item)
	{
		$criteria = self::createCriteria($trip, $item);

		return self::model()->delete($criteria);
	}

	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function setComplete($complete)
	{
		$this->setAttribute('complete', $complete);

		return $this->save();
	}

	public function tableName()
	{
		return 'trip_item';
	}

	public function rules()
	{
		return array(
			array('trip_id, item_id',
				'required',
			),
			array('trip_id, item_id',
				'numerical',
				'integerOnly' => TRUE,
				'min'         => 0,
			),
			array('complete',
				'boolean',
			),
		);
	}

	public function relations()
	{
		return array(
			'trip' => array(self::BELONGS_TO,
				'Trip',
				'trip_id',
			),
			'item' => array(self::BELONGS_TO,
				'Item',
				'item_id',
			),
		);
	}

	private static function createCriteria(Trip $trip, Item $item)
	{
		return new CDbCriteria(array(
			'condition' => 'trip_id = :trip_id AND item_id = :item_id',
			'params'    => array(
				'trip_id' => $trip->id,
				'item_id' => $item->id,
			),
		));
	}
}