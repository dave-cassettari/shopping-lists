<?php

class CurlRequest
{
	public $method 	= 'POST';
	public $url 	= NULL;
	public $headers = array();
	public $fields 	= array();
	public $files 	= array();
	
	public function __construct($url, $attributes = array())
	{
		$this->url = $url;
		
		foreach ($attributes as $key => $val)
		{
			$this->{$key} = $val;
		}
	}

	public function getOptions()
	{
		$url = $this->url;

		$hasBody = ($this->method === 'PUT' || $this->method === 'POST');
		
		if (!$hasBody)
		{
			$url .= '?' . http_build_query($this->fields);
		}

		$options = array(
			CURLOPT_URL 			=> $url,
			CURLOPT_RETURNTRANSFER 	=> TRUE,
			CURLOPT_CUSTOMREQUEST 	=> $this->method,
			CURLOPT_HTTPHEADER 		=> $this->headers,
		);

		if ($hasBody)
		{
			$fields = $this->fields;
			
			foreach ($this->files as $field => $file)
			{
				if (!file_exists($file))
				{
					throw new Exception('File ' . $file . ' does not exist', E_USER_ERROR);
				}
				
				if (is_int($field))
				{
					$field = 'file_' . ($field + 1);
				}
				
				$fields[$field] = '@' . $file;
			}
			
			$options[CURLOPT_POSTFIELDS] = $fields;
		}

		return $options;
	}

	public function execute()
	{
		$curl = curl_init();

		curl_setopt_array($curl, $this->getOptions());
		
		$response = array(
			'data' 			=> curl_exec($curl),
			'info' 			=> curl_getinfo($curl),
			'error-number' 	=> curl_errno($curl),
			'error-message' => curl_error($curl),
		);

		curl_close($curl);

		return $response;
	}
}