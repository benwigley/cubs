
CREATE DATABASE IF NOT EXISTS vegedatabase;
USE vegedatabase;


DROP TABLE IF EXISTS species;
CREATE TABLE species(
	id int auto_increment PRIMARY KEY NOT NULL,
	name char(50) NOT NULL,
	description TEXT NOT NULL,
	FULLTEXT (description)
) ENGINE = MyISAM;

CREATE UNIQUE INDEX index_species_name ON species(name);



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
