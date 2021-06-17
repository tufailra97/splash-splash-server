-- create a new table
CREATE TABLE users (
	userId uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	username text NOT NULL,
	email text NOT NULL,
	password text NOT NULL
)


-- insert into the user table
INSERT INTO users (password, username, email) VALUES ('password', 'username', 'password')

-- delete row from table 
DELETE FROM users where email = '';