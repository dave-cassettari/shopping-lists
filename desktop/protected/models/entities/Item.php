<?php

class Item extends AbstractActiveRecord
{
	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return 'item';
	}

	public function rules()
	{
		return array(
			array('list_id, unit_id, name, quantity',
				'required'
			),
			array('id, list_id, unit_id',
				'numerical',
				'integerOnly' => TRUE,
				'min'         => 0,
			),
			array('name',
				'length',
				'max' => self::LENGTH_VARCHAR,
			),
			array('quantity',
				'numerical',
				'integerOnly' => FALSE,
			),
		);
	}

	public function relations()
	{
		return array(
			'unit' => array(self::BELONGS_TO,
				'Unit',
				'unit_id',
			),
			'list' => array(self::BELONGS_TO,
				'ShoppingList',
				'list_id',
			),
		);
	}
}