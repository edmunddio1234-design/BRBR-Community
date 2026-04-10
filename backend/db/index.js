const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('WARNING: DATABASE_URL not set. Database features will not work.');
}

const pool = new Pool({
  connectionString,
  ssl: connectionString && connectionString.includes('render.com')
    ? { rejectUnauthorized: false }
    : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
