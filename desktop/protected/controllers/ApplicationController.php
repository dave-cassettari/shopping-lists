<?php

class ApplicationController extends AbstractController
{
	public function actions()
	{
		return array(
			'index' => 'application.controllers.application.ViewAction',
		);
	}
}