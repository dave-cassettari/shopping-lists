<?php

class ErrorAction extends AbstractAction
{
	public function run()
	{
		$error = Yii::app()->getErrorHandler()->getError();

		if (!$error)
		{
			$this->redirect(Yii::app()->getBasePath());
		}

		$data = array(
			'code'    => $error['code'],
			'message' => $error['message'],
			'file'    => $error['file'],
			'line'    => $error['line'],
			'trace'   => $error['trace'],
		);

		return $this->title('Error')->render('error', $data);
	}
}