<?php

class TripList extends AbstractActiveRecord
{
	public static function create(Trip $trip, ShoppingList $list)
	{
		$criteria = self::createCriteria($trip, $list);
		$item     = self::model()->find($criteria);

		if (!$item)
		{
			$item = new self;

			$item->setAttributes($criteria->params);
			$item->save();
		}

		return $item;
	}

	public static function remove(Trip $trip, ShoppingList $list)
	{
		$criteria = self::createCriteria($trip, $list);

		return self::model()->delete($criteria);
	}

	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return 'trip_list';
	}

	public function rules()
	{
		return array(
			array('trip_id, list_id',
				'required',
			),
			array('trip_id, list_id',
				'numerical',
				'integerOnly' => TRUE,
				'min'         => 0,
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
			'list' => array(self::BELONGS_TO,
				'ShoppingList',
				'list_id',
			),
		);
	}

	private static function createCriteria(Trip $trip, ShoppingList $list)
	{
		return new CDbCriteria(array(
			'condition' => 'trip_id = :trip_id AND list_id = :list_id',
			'params'    => array(
				'trip_id' => $trip->id,
				'list_id' => $list->id,
			),
		));
	}
}