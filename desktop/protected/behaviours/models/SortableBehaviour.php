<?php

class SortableBehaviour extends CActiveRecordBehavior
{
	public $column 		= 'display_order';
	public $condition 	= '1 = 1';
	
	public function increase($by)
	{
		$model 		= $this->owner;
		$column 	= $this->column;
		$condition 	= $this->condition;
		$criteria 	= new CDbCriteria(array(
			'limit' 	=> intval($by),
			'order' 	=> "$column  ASC",
			'condition' => "$condition AND $column > :sortColumn",
			'params' 	=> array(
				'sortColumn' => $model->{$column},
			),
		));
		$next 		= $model->find($criteria);
		$min 		= ($next) ? $next->{$column} : 0;
		$attributes = array(
			$column 	=> new CDbExpression("$column - ($min - {$model->{$column}})"),
		);
		
		$updated = $model->updateAll($attributes, $criteria);
	
		$model->{$column} += $updated;
	
		return $model->save();
	}
	
	public function decrease($by)
	{
		$model 		= $this->owner;
		$column 	= $this->column;
		$condition 	= $this->condition;
		$criteria 	= new CDbCriteria(array(
			'limit' 	=> intval($by),
			'order' 	=> "$column DESC",
			'condition' => "$condition AND $column < :sortColumn",
			'params' 	=> array(
				'sortColumn' => $model->{$column},
			),
		));
		$next 		= $model->find($criteria);
		$max 		= ($next) ? $next->{$column} : 0;
		$attributes = array(
			$column 	=> new CDbExpression("$column + ({$model->{$column}} - $max)"),
		);
	
		$updated = $model->updateAll($attributes, $criteria);
	
		$model->{$column} -= $updated;
	
		return $model->save();
	}
}