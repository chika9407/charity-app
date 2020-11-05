
**About the project**

DB schema:

API routes:

GlobalGibingAPI: https://www.globalgiving.org/api/methods/

**Technologies used:**

React.js
Express.js
Bootstrap
MySQL
(GitKraken here?)

**Dependencies**

Run yarn or npm install on root folder to install Express dependencies.

cd client and run yarn install React dependencies.

(jwt with bcrypt or passport for authentication, to be decided)

**Run Your Development Servers**

Run yarn start in project directory to start the Express server on port 5000

cd client and run yarn start to start client server in development mode with hot reloading in port 3000.

Client is configured so API calls will be proxied to port 5000.

Test client app at http://localhost:3000
Test API at http://localhost:5000/api

### Database Prep

Create `.env` file in project directory and add

```
DB_NAME=charityApp
DB_PASS=YOUR_PASSWORD
```

(replace `YOUR_PASSWORD` with your actual password)

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database charityApp;` to create a database in MySQL.

### Migration

Type: npm run migrate in the root folder
