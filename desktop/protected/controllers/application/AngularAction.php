<?php

class AngularAction extends AbstractAction
{
	public function run()
	{
		$this->getController()->layout = NULL;

		// check user etc

		$data = array();

		return $this->title('Welcome')->render('angular', $data);
	}
}