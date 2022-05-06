
# InStock - Server Side

InStock is an inventory management system for a warehouse distribution chain that manages a growing list of warehouses. This project is a collaborative project built by 4 highly ambitious Web Developers using Agile methodology, daily scrums and a Jira board for tracking progress and bugs. The Front End is built with React.js and styled with SASS. The Back End is built with Node and Express using MVC architecture. Data is persisted in a MySQL database, using Knex.js to interface with the DB. The application is fully responsive and will work well with screens of any sizes ranging from 320px in width and higher. 

## Tech Stack

**Client:** [React](https://reactjs.org/), [SASS](https://sass-lang.com/), [Axios](https://axios-http.com/)

**Server:** [Node](https://nodejs.dev/), [Express](https://expressjs.com/), [MySQL](https://www.mysql.com/), [Knex.js](http://knexjs.org/)

## Authors

- [Alejandro Mandala](https://github.com/sandro927)
- [Gurpreet Dhaliwal](https://github.com/GurpreetD13)
- [Ben Cartwright](https://github.com/b3nnyc)
- [Charanpreet Chall](https://github.com/CharanpreetChall)


## Demo

Coming soon.


## Lessons Learned

Coming soon.


## Run Locally

To run the server side locally, clone the project

```bash
  git clone https://github.com/GurpreetD13/instock-mulan-api
```

Go to the project directory

```bash
  cd instock-mulan-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index
```


## Connecting to the Database and seeding data

In order to connect the application to the databse, Knex. will be used. This library allows querying the SQL database using JavaScript syntax.

First install Knex.js if it has not yet been installed:

```bash
  npm install Knex --save
```

After installing Knex, a database named **instock** must be created inside of your local MySQL connection.

Once the database has been created, run the latest migration file to build the database table. To do this run the command as follows:

```bash
  knex migrate:latest
```

Once the tables have been created we can seed them to populate the tables with data. To do this run:

```bash
  knex seed:run
```


