<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * MY_Controller
 * 
 * This is the main controller which all my site controllers extend.
 * I can add functions here which need to be accessed by all controllers.
 *
 * @author	Ben Wigley
 */
class MY_Controller extends CI_Controller {
	
	protected $data	= 	array(
		'errors' 		=> array(),
		'template' 		=> 'layout',
		'main_content'	=> 'FALSE'
	);

	// --------------------------------------------------------------------

	function __construct()
	{
		parent::__construct();
		
		// Load the error language helper
		$this->lang->load('errors', $this->config->item('language'));
	}
	
	// --------------------------------------------------------------------
	
	/**
	 * Returns the default view for all controllers.
	 * 
	 * @param 	string	$tmp 	Optionally provide a template.
	 * @return	mixed
	 */
	protected function _default_view($tmp = FALSE)
	{
		$template = ($tmp ? $tmp : $this->data['template']);

		return $this->load->view($template, $this->data);
	}
	
}



/* End of file MY_Controller.php */
/* Location: ./application/core/MY_Controller.php */
