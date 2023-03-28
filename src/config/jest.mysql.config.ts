module.exports = {
  databaseOptions: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '0000',
    database: 'test',
  },
  createDatabase: true,
  dbSchema: 'DB_creation.sql',
  truncateDatabase: false,
};
