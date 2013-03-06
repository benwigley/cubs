Cubs
====

Cubs is a CodeIgniter Application Framework.

Stack:
* [CodeIgniter] (http://ellislab.com/codeigniter)
* [Underscore] (http://underscorejs.org/)
* [Backbone] (http://backbonejs.org/)
* [Stylus] (http://learnboost.github.com/stylus/) (or [LESS] (http://lesscss.org/))

Other:
* [Grunt] (http://gruntjs.com/) as a build tool
* [CodeIgniter Rest Server] (https://github.com/philsturgeon/codeigniter-restserver) by Phil Stergeon
* [PhpMyAdmin] (http://www.phpmyadmin.net) for managing the database


# Installation

# Development environment

## Clone repo
	git clone git@github.com:benwigley/cubs.git

## Database

### Configure CodeIgniter

* Copy the contents of "app/config/database-default.php" into a new file "app/config/database.php".
* Configure your username and password. This new file is ignored by git. 

#
	$db['default']['username'] = 'root';
	$db['default']['password'] = 'yourpassword';

## Grunt
Make sure you have [node] (http://nodejs.org/) installed before running these commands:

	# Install Grunt
	npm install -g grunt-cli

	# Install local node modles
	npm install

	# Run the "watch" task
	grunt w

To build the app without running the watch task, use
	
	grunt b

## Apache config

### Trun on mod_rewrite for CodeIgniter
#### Edit
	# Mac OSX
	/etc/apache2/httpd.conf
	
	# WAMP
	c:/wamp/bin/apache/apache2.22/conf/httpd.conf
	

Make sure this line is uncommented

	LoadModule rewrite_module modules/mod_rewrite.so


### Done. View the app on localhost
	http://127.0.0.1/cubs

# Building for Production

### Grunt task
	grunt p
