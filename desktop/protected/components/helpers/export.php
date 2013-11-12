<?php
	
function exportPDF($content, $filename)
{
	$content = utf8_encode($content);
	
	$pdf = Yii::app()->ePdf->mpdf();
	$pdf->WriteHTML($content);
	$pdf->Output();
	
	Yii::app()->end();
	
	return TRUE;
}
	
function exportDOC($content, $filename)
{
	header('Pragma: no-cache');
	header('Expires: 0');
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	header('Cache-Control: private', FALSE);
	header('Content-type: application/vnd.ms-word');
	header('Content-Disposition: attachment; filename="' . $filename . '"');
	header('Content-Transfer-Encoding: binary');
	
	echo $content;
	
	Yii::app()->end();
	
	return TRUE;
}

function exportAs($content, $format, $filename)
{
	$filename = $filename . '.' . $format;
	
	switch ($format)
	{
		case 'pdf':
			return exportPDF($content, $filename);
	
		case 'doc':
			return exportDOC($content, $filename);
		
		default:
			return FALSE;
	}
}