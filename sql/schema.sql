
CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;



DROP TABLE IF EXISTS users;
CREATE TABLE users(
	id int auto_increment PRIMARY KEY NOT NULL,
	email char(80) NOT NULL,
	username char(50) NOT NULL,
	full_name char(50) NOT NULL,
	passhash char(60) NOT NULL
) ENGINE = MyISAM;
CREATE UNIQUE INDEX index_user_email ON users(email);
CREATE UNIQUE INDEX index_user_username ON users(username);



-- CI_SESSIONS
DROP TABLE IF EXISTS ci_sessions;
CREATE TABLE `ci_sessions` (
	session_id varchar(40) DEFAULT '0' NOT NULL,
	ip_address varchar(16) DEFAULT '0' NOT NULL,
	user_agent varchar(120) NOT NULL,
	last_activity int(10) unsigned DEFAULT 0 NOT NULL,
	user_data text NOT NULL,
	PRIMARY KEY (session_id),
	KEY `last_activity_idx` (`last_activity`)
);
