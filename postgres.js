const { Pool } = require('pg')


const connectionString = process.env.POSTGRES_URI;
const pool = new Pool({ connectionString });
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

// データベースの宣言
async function selsectQuery(pool) {
  const cliant = await pool.connect();
  try {
    const res = cliant.query("SELECT * FORM Cal_TABLE");
    return new Promise((resolve) => {
      resolve(res);
    })
  } finally {
    cliant.release();
  }
}

async function insertQury(pool, val) {
  const q = {
    text: 'INSERT INTO Cal_TABLE(formura) VALUES($1)',
    values: [val],
  }
  const cliant = await pool.connect();
  try {
    const res = cliant.query(q);
    return new Promise((resolve) => {
      resolve(res);
    })
  } finally {
    cliant.release();
  }
}

async function deleteQuery(pool) {
  const cliant = await pool.connect();
  try {
    const res = cliant.query("DELETE FROM Cal_TABLE");
    return new Promise((resolve) => {
      resolve(res);
    })
  } finally {
    cliant.release();
  }
}

exports.selsectQuery = selsectQuery;
exports.insertQury = insertQury;
exports.deleteQuery = deleteQuery;