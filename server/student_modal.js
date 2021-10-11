const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'edephtwh',
  host: 'ziggy.db.elephantsql.com',
  database: 'edephtwh',
  password: 'Uk3O2qMRUXjF8F-tSgfTI3gsIVZQhqRm',
  port: 5432,
});

const getStudentInfo = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM people WHERE email = $1',
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
};
