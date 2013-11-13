<?php

class UnitsController extends AbstractApiController
{
	protected function getModel()
	{
		return Unit::model();
	}

	protected function createObject()
	{
		return new Unit;
	}
}