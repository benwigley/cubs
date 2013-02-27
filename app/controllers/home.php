<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MY_Controller {

	/**
	 * Index page for the site.
	 *
	 */
	public function index()
	{
		$this->data['main_content'] = 'front/home';
		$this->_default_view();
	}

	/**
	 * Allows for searching of vegetables and their locations.
	 * Basicallly just a test method for now.
	 *
	 */
	public function search()
	{
		$this->_default_view();
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */