<?php

class Unit extends AbstractActiveRecord
{
	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return 'unit';
	}

	public function rules()
	{
		return array(
			array('name, symbol, multiplier, canonical_id',
				'required'
			),
			array('id, canonical_id',
				'numerical',
				'integerOnly' => TRUE,
				'min'         => 0,
			),
			array('name, symbol',
				'length',
				'max' => self::LENGTH_VARCHAR,
			),
			array('multiplier',
				'numerical',
				'integerOnly' => FALSE,
			),
		);
	}

	public function relations()
	{
		return array(
			'items' => array(self::HAS_MANY,
				'Item',
				'unit_id',
			),
		);
	}
}