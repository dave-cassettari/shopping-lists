<?php

class UsersController extends AbstractApiController
{
	protected function getModel()
	{
		return User::model();
	}

	protected function createObject()
	{
		return new User;
	}
}