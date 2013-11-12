<?php

class ApiModule extends CWebModule
{
	public function init()
	{
		parent::init();

		$this->setImport(array(
			'api.controllers.AbstractApiController',
		));
	}
}