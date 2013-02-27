<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index page for the site.
	 *
	 */
	public function index()
	{
		$this->load->view('layout');
	}

	/**
	 * Allows for searching of vegetables and their locations.
	 * Basicallly just a test method for now.
	 *
	 */
	public function search()
	{
		$this->load->view('layout');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */