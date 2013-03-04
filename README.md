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
First install [node] (http://nodejs.org/)

Then enter the following commands into terminal

	# Install Grunt
	npm install -g grunt-cli

	# Install local node modles
	npm install

	# Run the "watch" task
	grunt w

To build the app without running the watch task, use
	
	grunt b

## Done. View the app on localhost
	http://127.0.0.1/cubs

# Building for Production

## Grunt task
	grunt p
