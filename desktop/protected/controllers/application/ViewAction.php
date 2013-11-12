<?php

class ViewAction extends AbstractAction
{
	public function run()
	{
		$this->getController()->layout = NULL;

		// check user etc

		$data = array();

		return $this->title('Welcome')->render('view', $data);
	}
}