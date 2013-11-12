<?php

class HomeAction extends AbstractAction
{
//	public function __construct()
//	{
//		debug_print_backtrace ();exit;
//	}

	public function run()
	{
		if (!$this->guest())
		{
			$url = $this->createUrl('/payments');

			return $this->redirect($url);
		}

		$data = array(

		);

		return $this->title('Welcome')->render('home', $data);
	}
}