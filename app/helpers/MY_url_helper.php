<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Assets URL
 * 
 * Utilizes the CodeIgniter base_url function in order to
 * provde an assets url.
 *
 * @access	public
 * @param string
 * @return	string
 */
function assets_url($uri = '')
{
	$CI 	=& get_instance();
	$prefix =  ($_SERVER['IS_LOCALHOST'] ? '' : ASSETS_DIR);

	return $CI->config->base_url($prefix.$uri);
}
