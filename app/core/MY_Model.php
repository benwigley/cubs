<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * MY_Model
 * 
 * This is the main model which all site models extend.
 * Conatins functions and data that apply accross all models.
 */
class MY_Model extends CI_Model
{

	protected $result = array(
		'error' 	=> FALSE,
		'status' 	=> 'success',
		'pkg'		=> NULL
	);

	// --------------------------------------------------------------------

	function __construct()
	{
		parent::__construct();
		
		$this->lang->load('errors', $this->config->item('language'));
	}

	// --------------------------------------------------------------------

	/**
	 * Set the pkg for any query that returns a result.
	 * If there is no data in $resource, returns false.
	 *
	 * @param 	recource 	$resource
	 * @return 	bool
	 */
	function _set_pkg($resource)
	{
		if ($resource && $resource->num_rows() > 0) {
			$this->result['pkg'] = $resource->result_array();
			return true;
		}
		$this->result['pkg'] = array();
		return false;
	}

	// --------------------------------------------------------------------

	/**
	 * Set a human readable error msg for the mode recent mysql query.
	 */
	function _set_error()
	{
		$this->result['status'] = 'error';

		if ($this->db->_error_number() === 1062) {
			$this->result['error'] = lang('duplicate_row');
		}
		else {
			$this->result['error'] = lang('internal_error');

			// We don't want people seeing out actual DB error messages.
			if ($_SERVER['APP_ENV'] === "DEVELOPMENT")
				$this->result['error'] = $this->db->_error_message();
		}
	}
	
}



/* End of file MY_Model.php */
/* Location: ./application/core/MY_Model.php */
