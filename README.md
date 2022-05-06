
# InStock - Server Side

InStock is an inventory management system for a warehouse distribution chain that manages a growing list of warehouses. This application is fully responsive and will work well with screens of any size. 


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
  cd instock-mulan
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

In order to connect the application to the databse, Knex.js will be used. This library allows querying the SQL database using JavaScript syntax.

First install Knex.js if it has not yet been installed:

```http
  npm install Knex --save
```

After installing Knex, a database named **instock** must be created inside of your local MySQL connection.

Once the database has been created, run the latest migration file to build the database table. To do this run the command as follows:

```http
  knex migrate:latest
```

Once the tables have been created we can seed them to populate the tables with data. To do this run:

```http
  knex seed:run
```


## Tech Stack

**Client:** React, SASS, Axios

**Server:** Node, Express, MySQL, Knex.js

