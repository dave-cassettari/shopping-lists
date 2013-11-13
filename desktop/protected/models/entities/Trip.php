<?php

class Trip extends AbstractActiveRecord
{
	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return 'trip';
	}

	public function rules()
	{
		return array(
			array('user_id',
				'required'
			),
			array('id, user_id',
				'numerical',
				'integerOnly' => TRUE,
				'min'         => 0,
			),
		);
	}

	public function relations()
	{
		return array(
			'user'      => array(self::BELONGS_TO,
				'User',
				'user_id',
			),
			'lists'     => array(self::MANY_MANY,
				'ShoppingList',
				'trip_list(trip_id, list_id)',
			),
			'tripItems' => array(self::HAS_MANY,
				'TripItem',
				'trip_id',
			),
		);
	}
}