# How to run

### Set up the database

Copy the commands in `db.sql` into a new postgres database. This will create and populate the Student table, and define the functions.
Note: This application is written to run with a postgres server set up on port 5432, database "comp3005", user "postgres", and password "don". Other user accounts may require changes to `server.js`

### Run the server

`npm install`
`node server.js`

Test it on `https://localhost:3000`
