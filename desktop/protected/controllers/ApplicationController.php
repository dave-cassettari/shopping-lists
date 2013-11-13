<?php

class ApplicationController extends AbstractController
{
	public function actions()
	{
		return array(
			'ember'   => 'application.controllers.application.EmberAction',
			'angular' => 'application.controllers.application.AngularAction',
		);
	}
}