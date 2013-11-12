<?php

abstract class AbstractActiveRecord extends CActiveRecord implements JsonSerializable
{
	/*
	 *
	 (\bfunction)\s([a-zA-Z]+[_]+)+[a-zA-Z]*\(
	 *
	 */

	const LENGTH_TEXT       = 65535;
	const LENGTH_MEDIUMTEXT = 16777215;
	const LENGTH_VARCHAR    = 255;
	const LENGTH_TELEPHONE  = 30;
	const LENGTH_POSTCODE   = 25;
	const LENGTH_COUNTRY    = 2;
	public static $db = FALSE;

	public function save($ignore_errors = FALSE, $run_validation = TRUE, array $attributes = NULL)
	{
		$result = parent::save($run_validation, $attributes);

		if ($result === FALSE && $ignore_errors !== TRUE)
		{
			$class  = get_class($this);
			$errors = $this->getErrors();
			$values = $this->getAttributes(array_keys($errors));

			if (YII_DEBUG)
			{
				$values = $this->getAttributes();
			}

			$message = 'Could not save ' . $class . ' with errors: ' . print_r($errors, TRUE) . ' and attributes: ' . print_r($values, TRUE);

			Yii::log($message, CLogger::LEVEL_ERROR);

			if (YII_DEBUG)
			{
				debug_print_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);

				exit;
			}

			throw new Exception($message);
		}

		return $this->refresh();
	}

	public function refresh()
	{
		if (parent::refresh() === FALSE)
		{
			throw new Exception('Could not Refresh object');
		}

		return $this;
	}

	public function defaultScope()
	{
		$default = parent::defaultScope();

		if ($name = $this->defaultScopeName())
		{
			$scopes = $this->scopes();

			$default = $scopes[$name];
		}

		if (!array_key_exists('alias', $default) || $default['alias'] == 't')
		{
			$default = CMap::mergeArray($default, array(
				'alias' => $this->tableName(),
			));
		}

		return $default;
	}

	public function database_name()
	{
		return FALSE;
	}

	public function __get($name)
	{
		$getter = 'get' . $name;

		if (method_exists($this, $getter))
		{
			return $this->$getter();
		}

		return parent::__get($name);
	}

	public function __set($name, $value)
	{
		$setter = 'set' . $name;

		if (method_exists($this, $setter))
		{
			$this->$setter($value);
		}
		else
		{
			parent::__set($name, $value);
		}

		return $this;
	}

	public function jsonSerialize()
	{
		$attributes = $this->getAttributes();

		foreach ($this->relations() as $name => $config)
		{
			$type = $config[0];

			switch ($type)
			{
				case self::HAS_MANY:
					$key              = $name;
					$related          = $this->getRelated($name);
					$attributes[$key] = array();

					foreach ($related as $related_object)
					{
						$attributes[$key][] = $related_object->id;
					}
					break;

				case self::BELONGS_TO:
					$key     = $name . '_id';
					$related = $this->getRelated($name);

					unset($attributes[$key]);

					$attributes[$name] = $related->id;
					break;
			}
		}

		return $attributes;
	}

	public function __toString()
	{
		return implode(', ', $this->getAttributes());
	}

	public static function modelFromTable($table)
	{
		$class = str_replace(' ', '', ucwords(str_replace('_', ' ', $table)));

		return self::model($class);
	}

	public static function getFromID($id, $with = NULL)
	{
		$condition = '';
		$params    = array();
		$model     = static::model();
		$schema    = $model->getTableSchema();
		$prefix    = $model->getTableAlias(TRUE) . '.';
		$criteria  = $model->getCommandBuilder()->createPkCriteria($schema, $id, $condition, $params, $prefix);

		if ($with !== NULL)
		{
			$criteria->with = $with;
		}

		return $model->find($criteria);
	}

	public static function maxValue($column, array $attributes = array())
	{
		$criteria = new CDbCriteria(array(
			'limit' => 1,
			'order' => $column,
		));

		foreach ($attributes as $name => $value)
		{
			$criteria->addCondition($name . ' = ' . $value);
		}

		$object = static::model()->find($criteria);

		if ($object)
		{
			return $object->$column;
		}

		return 0;
	}

	public static function nextValue($column, array $attributes = array())
	{
		return (self::maxValue($column, $attributes) + 1);
	}

	protected function afterFind()
	{
		parent::afterFind();

		foreach ($this->getMetaData()->columns as $name => $meta_data)
		{
			$type = $meta_data->dbType;

			if (strncmp($type, 'decimal', 7) === 0)
			{
				$matches = array();

				preg_match_all('/\([0-9,]+\)/', $type, $matches);

				foreach ($matches as $match)
				{
					$match = $match[0];
					$scale = substr($match, strpos($match, ',') + 1, 1);

					if (is_numeric($scale))
					{
						$this->$name = new Money($this->$name, $scale);
					}
				}

				$this->$name = new Money($this->$name);
			}
		}
	}

	protected function defaultScopeName()
	{
		return NULL;
	}
}