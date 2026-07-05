const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT || 1433),

  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
  },

  connectionTimeout: 60000,
  requestTimeout: 60000,

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log('Conexión a SQL Server exitosa');
    return pool;
  })
  .catch((error) => {
    console.error('Error al conectar a SQL Server:', error);
    throw error;
  });

module.exports = {
  sql,
  poolPromise
};