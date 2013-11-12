<?php

class User extends AbstractActiveRecord
{
	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return 'user';
	}

	public function rules()
	{
		return array(
			array('name, email',
				'required'
			),
			array('id',
				'numerical',
				'integerOnly' => TRUE,
				'min'         => 0,
			),
			array('email, password_code',
				'unique',
				'className' => get_class(),
			),
			array('name, email, password_hash, password_salt, password_code',
				'length',
				'max' => self::LENGTH_VARCHAR,
			),
		);
	}

	public function relations()
	{
		return array(
			'getLists' => array(self::HAS_MANY,
				'List',
				'user_id',
			),
		);
	}
}