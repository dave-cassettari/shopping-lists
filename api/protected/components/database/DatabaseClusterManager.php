<?php

class DatabaseClusterManager extends CDbConnection
{
	private $_dbs = array();

	public $cluster 	= array();
	public $clusters 	= array();
	public $connections = array();
	
	private function getCluster()
	{
		if (!$this->_dbs)
		{
			foreach ($this->connections as $name => $connection)
			{
				$class 	= $connection['class'];
				$db 	= Yii::createComponent($connection);
				// 			new $class;
				// 			$db->setAttributes($connection);
				// 			$db->init();
			
				$this->_dbs[$name] = $db;
			}
		}
		
		$this->cluster = $this->_dbs;
		
		return $this->cluster;
	}

	private function getActiveDb($set_active = FALSE)
	{
		if ($set_active)
		{
			$this->setActive(TRUE);
		}
		
		foreach ($this->getCluster() as $db)
		{
			if ($db->getActive())
			{
				return $db;
			}
		}

		return NULL;
	}

	public function getActive()
	{
		return ($this->getActiveDb() !== NULL);
	}

	/**
	 * If TRUE, set first successful database to TRUE
	 * If FALSE, set all databases to FALSE
	 *
	 * @param boolean $value
	 */
	public function setActive($value)
	{
		$value = (bool)$value;
		
		foreach ($this->getCluster() as $name => $db)
		{
			try
			{
				$db->setActive($value);
				
				if ($value == TRUE)
				{
					return;
				}
			}
			catch (Exception $e)
			{
				Yii::log('Could not connect to database: ' . $name, CLogger::LEVEL_WARNING);
				
				continue;
			}
		}
		
		if ($value == TRUE)
		{
			Yii::log('Could not connect to cluster', CLogger::LEVEL_ERROR);
			
			throw new Exception('Could not connect to cluster: ' . $e->getMessage());
		}
	}

	public function cache($duration, $dependency = NULL, $queryCount = 1)
	{
		foreach ($this->cluster as $db)
		{
			$db->cache($duration, $dependency, $queryCount);
		}
	}
	
	public function getPdoInstance()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getPdoInstance();
		}
		return NULL;
	}
	
	public function createCommand($query = NULL)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->createCommand($query);
		}
		return NULL;
	}
	
	/**
	 * Returns the currently active transaction.
	 * @return CDbTransaction the currently active transaction. Null if no active transaction.
	 */
	public function getCurrentTransaction()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getCurrentTransaction();
		}
		return NULL;
	}
	
	/**
	 * Starts a transaction.
	 * @return CDbTransaction the transaction initiated
	 */
	public function beginTransaction()
	{
		if ($db = $this->getActiveDb(TRUE))
		{
			return $db->beginTransaction();
		}
		return NULL;
	}
	
	/**
	 * Returns the database schema for the current connection
	 * @return CDbSchema the database schema for the current connection
	 */
	public function getSchema()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getSchema();
		}
		return NULL;
	}
	
	/**
	 * Returns the SQL command builder for the current DB connection.
	 * @return CDbCommandBuilder the command builder
	 */
	public function getCommandBuilder()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getCommandBuilder();
		}
		return NULL;
	}
	
	/**
	 * Returns the ID of the last inserted row or sequence value.
	 * @param string $sequenceName name of the sequence object (required by some DBMS)
	 * @return string the row ID of the last row inserted, or the last value retrieved from the sequence object
	 * @see http://www.php.net/manual/en/function.PDO-lastInsertId.php
	 */
	public function getLastInsertID($sequenceName = '')
	{
		if ($db = $this->getActiveDb(TRUE))
		{
			return $db->getLastInsertID($sequenceName);
		}
		return NULL;
	}
	
	/**
	 * Quotes a string value for use in a query.
	 * @param string $str string to be quoted
	 * @return string the properly quoted string
	 * @see http://www.php.net/manual/en/function.PDO-quote.php
	 */
	public function quoteValue($str)
	{
		if ($db = $this->getActiveDb(TRUE))
		{
			return $db->quoteValue($str);
		}
		return NULL;
	}
	
	/**
	 * Quotes a table name for use in a query.
	 * If the table name contains schema prefix, the prefix will also be properly quoted.
	 * @param string $name table name
	 * @return string the properly quoted table name
	 */
	public function quoteTableName($name)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->quoteTableName($name);
		}
		return NULL;
	}
	
	/**
	 * Quotes a column name for use in a query.
	 * If the column name contains prefix, the prefix will also be properly quoted.
	 * @param string $name column name
	 * @return string the properly quoted column name
	 */
	public function quoteColumnName($name)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->quoteColumnName($name);
		}
		return NULL;
	}
	
	/**
	 * Determines the PDO type for the specified PHP type.
	 * @param string $type The PHP type (obtained by gettype() call).
	 * @return integer the corresponding PDO type
	 */
	public function getPdoType($type)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getPdoType($type);
		}
		return NULL;
	}
	
	/**
	 * Returns the case of the column names
	 * @return mixed the case of the column names
	 * @see http://www.php.net/manual/en/pdo.setattribute.php
	 */
	public function getColumnCase()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getColumnCase();
		}
		return NULL;
	}
	
	/**
	 * Sets the case of the column names.
	 * @param mixed $value the case of the column names
	 * @see http://www.php.net/manual/en/pdo.setattribute.php
	 */
	public function setColumnCase($value)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->setColumnCase($value);
		}
		return NULL;
	}
	
	/**
	 * Returns how the null and empty strings are converted.
	 * @return mixed how the null and empty strings are converted
	 * @see http://www.php.net/manual/en/pdo.setattribute.php
	 */
	public function getNullConversion()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getNullConversion();
		}
		return NULL;
	}
	
	/**
	 * Sets how the null and empty strings are converted.
	 * @param mixed $value how the null and empty strings are converted
	 * @see http://www.php.net/manual/en/pdo.setattribute.php
	 */
	public function setNullConversion($value)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->setNullConversion($value);
		}
		return NULL;
	}
	
	/**
	 * Returns whether creating or updating a DB record will be automatically committed.
	 * Some DBMS (such as sqlite) may not support this feature.
	 * @return boolean whether creating or updating a DB record will be automatically committed.
	 */
	public function getAutoCommit()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getAutoCommit();
		}
		return NULL;
	}
	
	/**
	 * Sets whether creating or updating a DB record will be automatically committed.
	 * Some DBMS (such as sqlite) may not support this feature.
	 * @param boolean $value whether creating or updating a DB record will be automatically committed.
	 */
	public function setAutoCommit($value)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->setAutoCommit($value);
		}
		return NULL;
	}
	
	/**
	 * Returns whether the connection is persistent or not.
	 * Some DBMS (such as sqlite) may not support this feature.
	 * @return boolean whether the connection is persistent or not
	 */
	public function getPersistent()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getPersistent();
		}
		return NULL;
	}
	
	/**
	 * Sets whether the connection is persistent or not.
	 * Some DBMS (such as sqlite) may not support this feature.
	 * @param boolean $value whether the connection is persistent or not
	 */
	public function setPersistent($value)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->setPersistent($value);
		}
		return NULL;
	}
	
	/**
	 * Returns the name of the DB driver
	 * @return string name of the DB driver
	 */
	public function getDriverName()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getDriverName();
		}
		return NULL;
	}
	
	/**
	 * Returns the version information of the DB driver.
	 * @return string the version information of the DB driver
	 */
	public function getClientVersion()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getClientVersion();
		}
		return NULL;
	}
	
	/**
	 * Returns the status of the connection.
	 * Some DBMS (such as sqlite) may not support this feature.
	 * @return string the status of the connection
	 */
	public function getConnectionStatus()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getConnectionStatus();
		}
		return NULL;
	}
	
	/**
	 * Returns whether the connection performs data prefetching.
	 * @return boolean whether the connection performs data prefetching
	 */
	public function getPrefetch()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getPrefetch();
		}
		return NULL;
	}
	
	/**
	 * Returns the information of DBMS server.
	 * @return string the information of DBMS server
	 */
	public function getServerInfo()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getServerInfo();
		}
		return NULL;
	}
	
	/**
	 * Returns the version information of DBMS server.
	 * @return string the version information of DBMS server
	 */
	public function getServerVersion()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getServerVersion();
		}
		return NULL;
	}
	
	/**
	 * Returns the timeout settings for the connection.
	 * @return integer timeout settings for the connection
	 */
	public function getTimeout()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getTimeout();
		}
		return NULL;
	}
	
	/**
	 * Obtains a specific DB connection attribute information.
	 * @param integer $name the attribute to be queried
	 * @return mixed the corresponding attribute information
	 * @see http://www.php.net/manual/en/function.PDO-getAttribute.php
	 */
	public function getAttribute($name)
	{
		if ($db = $this->getActiveDb(TRUE))
		{
			return $db->getAttribute($name);
		}
		return NULL;
	}
	
	/**
	 * Sets an attribute on the database connection.
	 * @param integer $name the attribute to be set
	 * @param mixed $value the attribute value
	 * @see http://www.php.net/manual/en/function.PDO-setAttribute.php
	 */
	public function setAttribute($name, $value)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->setAttribute($name, $value);
		}
		return NULL;
	}
	
	/**
	 * Returns the attributes that are previously explicitly set for the DB connection.
	 * @return array attributes (name=>value) that are previously explicitly set for the DB connection.
	 * @see setAttributes
	 * @since 1.1.7
	 */
	public function getAttributes()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getAttributes();
		}
		return NULL;
	}
	
	/**
	 * Sets a set of attributes on the database connection.
	 * @param array $values attributes (name=>value) to be set.
	 * @see setAttribute
	 * @since 1.1.7
	 */
	public function setAttributes($values)
	{
		if ($db = $this->getActiveDb())
		{
			return $db->setAttributes($values);
		}
		return NULL;
	}
	
	/**
	 * Returns the statistical results of SQL executions.
	 * The results returned include the number of SQL statements executed and
	 * the total time spent.
	 * In order to use this method, {@link enableProfiling} has to be set true.
	 * @return array the first element indicates the number of SQL statements executed,
	 * and the second element the total time spent in SQL execution.
	 */
	public function getStats()
	{
		if ($db = $this->getActiveDb())
		{
			return $db->getStats();
		}
		return NULL;
	}
}