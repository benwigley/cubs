vege-app
========

A simple lookup for planting times and info for various fruits and vegetables in your location.


# Development environment

## Clone repo
	git clone git@github.com:Gerwinnz/vege-app.git

## Configure database
This probably isn't the best way to do things, it would be good to have a nice db migrate system.

* Copy the contents of "app/config/database-default.php" into a new file "app/config/database.php".
* Configure your username and password. This new file is ignored by git. 

#
	$db['default']['username'] = 'root';
	$db['default']['password'] = 'yourpassword';

## Import the schema.sql file
	mysql -u root -p < sql/schema.sql
