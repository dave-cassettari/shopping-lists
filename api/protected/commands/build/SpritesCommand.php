<?php

class SpritesCommand extends AbstractCommand
{
	const SPRITE_SIZE = 4;
	
	public function actionIndex($size = 64, $directory = NULL, $base = '/../application/images/icons/')
	{
		if (is_string($directory))
		{
			$directory 		= realpath(Yii::app()->getBasePath() . $base . $directory);
			$directories 	= array($directory);
		}
		else
		{
			$directories 	= array();
			$files 			= scandir(Yii::app()->getBasePath() . $base);
			
			foreach ($files as $file)
			{
				$path = Yii::app()->getBasePath() . $base . $file;
				
				if ($file != '.' && $file != '..' && is_dir($path))
				{
					$directories[] = realpath($path);
				}
			}
		}
		
		foreach ($directories as $directory)
		{
			$size 		= 0;
			$files 		= scandir($directory);
			$images 	= array();
			$variables  = array();
			
			foreach ($files as $file)
			{
				if ($file == '.' || $file == '..')
				{
					continue;
				}
				
				$image 		= NULL;
				$path 		= realpath($directory . '/' . $file);
				$basename 	= strtolower(pathinfo($path, PATHINFO_FILENAME));
				$extension 	= strtolower(pathinfo($path, PATHINFO_EXTENSION));
				
				switch ($extension)
				{
					case 'png':
						$image = imagecreatefrompng($path);
						break;
						
					case 'jpg':
					case 'jpeg':
						$image = imagecreatefromjpeg($path);
						break;
				}
				
				if (!$image)
				{
					continue;
				}
				
				$size 			= max(imagesx($image), max(imagesy($image), $size));
				$images[] 		= $image;
				$variables[] 	= $basename;
			}
			
			$index 	= 0;
			$size 	= $size * self::SPRITE_SIZE;
			$size_h = $size * sizeof($images);
			$sprite = imagecreatetruecolor($size, $size_h);
			
			imagealphablending($sprite, FALSE);
			
			$colour = imagecolorallocatealpha($sprite, 255, 255, 255, 127);
			
			imagefilledrectangle($sprite, 0, 0, $size,$size_h, $colour);
			
			imagealphablending($sprite, TRUE);
			
			foreach ($images as $image)
			{
				$x = 0;
				$y = $index * $size;
				$w = imagesx($image);
				$h = imagesy($image);
				
				imagecopyresampled($sprite, $image, $x, $y, 0, 0, $w, $h, $w, $h);
				
				imagealphablending($sprite, TRUE);
				
				imagedestroy($image);
				
				++$index;
			}
			
			$name 		= $directory . '.png';
			$quality 	= 9;
			$filters 	= PNG_NO_FILTER;
			
			imagealphablending($sprite, FALSE);
			imagesavealpha($sprite, TRUE);
			
			imagepng($sprite, $name, $quality, $filters);
			
			imagedestroy($sprite);
			
			$sass 		= str_replace('.png', '.scss', $name);
			$handle 	= fopen($sass, 'w');
			
			foreach ($variables as $index => $variable)
			{
				$line = '$sprite-' . basename($directory) . '-' . $variable . ' : ' . $index . ';' . PHP_EOL;
				
				fwrite($handle, $line);
			}
			
			fclose($handle);
		}
	}
}