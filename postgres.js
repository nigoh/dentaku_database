const { Pool } = require('pg')

const connectionString = process.env.POSTGRES_URI;
const pool = new Pool({ connectionString });

// データベースの宣言
async function selsectQuery() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query("SELECT * FROM Cal_TABLE");
    await client.query('COMMIT');
    return new Promise((resolve) => {
      resolve(res);
    })
  } finally {
    await client.release();
  }
}

async function insertQury(val) {
  const q = {
    text: 'INSERT INTO Cal_TABLE(formura) VALUES($1)',
    values: [val],
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query(q);
    await client.query('COMMIT');
    return new Promise((resolve) => {
      resolve(res);
    })
  } finally {
    client.release();
  }
}

async function deleteQuery() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query("DELETE FROM Cal_TABLE");
    await client.query('COMMIT');
    return new Promise((resolve) => {
      resolve(res);
    })
  } finally {
    client.release();
  }
}

exports.selsectQuery = selsectQuery;
exports.insertQury = insertQury;
exports.deleteQuery = deleteQuery;