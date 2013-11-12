<?php

class NestedPDO extends PDO
{
	protected static $savepoints = array('pgsql', 'mysql');
	protected $transaction_level = 0;

	protected function nestable()
	{
		return in_array($this->getAttribute(PDO::ATTR_DRIVER_NAME), self::$savepoints);
	}

	public function beginTransaction()
	{
		if ($this->transaction_level == 0 || !$this->nestable())
		{
			parent::beginTransaction();
		}
		else
		{
			$this->exec("SAVEPOINT LEVEL{$this->transaction_level}");
		}
		
		$this->transaction_level++;
	}

	public function commit()
	{
		$this->transaction_level--;

		if ($this->transaction_level == 0 || !$this->nestable())
		{
			parent::commit();
		}
		else
		{
			$this->exec("RELEASE SAVEPOINT LEVEL{$this->transaction_level}");
		}
	}

	public function rollBack()
	{
		$this->transaction_level--;

		if ($this->transaction_level == 0 || !$this->nestable())
		{
			parent::rollBack();
		}
		else
		{
			$this->exec("ROLLBACK TO SAVEPOINT LEVEL{$this->transaction_level}");
		}
	}
}