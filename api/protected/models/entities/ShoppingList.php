<?php

class ShoppingList extends AbstractActiveRecord
{
	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return 'list';
	}

	public function rules()
	{
		return array(
			array('user_id, name',
				'required'
			),
			array('id, user_id',
				'numerical',
				'integerOnly' => TRUE,
				'min'         => 0,
			),
			array('name',
				'length',
				'max' => self::LENGTH_VARCHAR,
			),
		);
	}

	public function relations()
	{
		return array(
			'getItems' => array(self::HAS_MANY,
				'Item',
				'list_id',
			),
			'getUser'  => array(self::BELONGS_TO,
				'User',
				'user_id',
			),
		);
	}
}