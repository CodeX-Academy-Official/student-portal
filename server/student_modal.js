const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: 5432,
});

const getStudents = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM PEOPLE ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getStudentInfo = (request) => {
  const email = request.params.email;
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM PEOPLE WHERE email = $1',
      [email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getStudentInfo,
  getStudents,
};
