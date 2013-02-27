vege-app
========

A simple lookup for planting times and info for various fruits and vegetables in your location.


# Development environment

## Clone repo
	git clone git@github.com:Gerwinnz/vege-app.git

## Database

### Configure CodeIgniter

* Copy the contents of "app/config/database-default.php" into a new file "app/config/database.php".
* Configure your username and password. This new file is ignored by git. 

#
	$db['default']['username'] = 'root';
	$db['default']['password'] = 'yourpassword';

### Import the schema
	mysql -u root -p < sql/schema.sql

## Create a new host (optional)

Note: File paths may differ on windows.

#### Edit
	/etc/hosts

Append this line

	127.0.0.1     dev.vege.com

#### Edit
	/private/etc/apache2/extra/httpd-vhosts.conf

Append this

	<VirtualHost *:80>
        ServerName dev.vege.com
        DocumentRoot "/Users/{username}/Sites/vege-app"
    </VirtualHost>

## Done. View the app here
	http://dev.vege.com
