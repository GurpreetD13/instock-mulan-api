// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 const connections = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "rootroot",
    database: "instock",
    charset: "utf8",
    timezone: 'etc'
  },
  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
  },
};

module.exports = 
  process.env.NODE_ENV === 'production'
    ? connections.production
    : connections.development;