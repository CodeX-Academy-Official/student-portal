const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'edephtwh',
  host: 'ziggy.db.elephantsql.com',
  database: 'edephtwh',
  password: 'Uk3O2qMRUXjF8F-tSgfTI3gsIVZQhqRm',
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
