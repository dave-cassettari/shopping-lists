<?php

class SiteController extends AbstractController
{
	public function actions()
	{
		return array(
			'index' => 'application.controllers.site.HomeAction',
			'error' => 'application.controllers.site.ErrorAction',
		);
	}
}