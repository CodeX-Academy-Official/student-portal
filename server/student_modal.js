const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: 5432,
});

const getStudentInfo = (request) => {
  const email = request.params.email;
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT
      FirstSet.id,
      FirstSet."firstName",
      FirstSet."secondName",
      FirstSet."lastName",
      FirstSet."secondLastName",
      FirstSet.email,
      FirstSet."expectedStartDate",
      FirstSet."expectedEndDate",
      FirstSet.months,
      FirstSet."meetingTimePreference",
      FirstSet."birthDate",
      FirstSet.zone,
      FirstSet."weeklyHours",
      FirstSet."coachingIntensity",
      FirstSet."coachingHumor",
      FirstSet."studyDays",
      FirstSet."targetCertification",
      FirstSet."status",
      FirstSet.attributes,
      FirstSet.level,
      FirstSet."isActive",
      SecondSet."LastActivity"
    FROM(
    SELECT   
      u.id,
      u."firstName",
      u."secondName",
      u."lastName",
      u."secondLastName",
      u.email,
      u."expectedStartDate",
      u."expectedEndDate",
      u.months,
      u."meetingTimePreference",
      u."birthDate",
      u.zone,
      u."weeklyHours",
      u."coachingIntensity",
      u."coachingHumor",
      u."studyDays",
      u."targetCertification",
      u.attributes,
      p1.level,
      p1."isActive",
      u."isMentor",
      u.status
    FROM people u
    LEFT JOIN enrollments p1 ON (u.id = p1."studentId")
    LEFT OUTER JOIN enrollments p2 ON (u.id = p2."studentId" AND 
        (p1.level < p2.level OR (p1.level = p2.level AND p1.id < p2.id)))
    WHERE  p2.id ISNULL AND u."isMentor"=false and u.email = '${email}'
    ORDER BY p1."isActive" ASC
    ) AS FirstSet
    LEFT JOIN(
    SELECT
         M.owner, DATE_PART('day', NOW() - MAX(M.time)) as "LastActivity" 
    FROM activity M  where M.type='badge award' GROUP by M.owner
    ) as SecondSet
    on FirstSet.email = SecondSet.owner
    ORDER by FirstSet.id`,
      (error, results) => {
        if (error || results.rows === undefined) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const getStudentActivity = (request) => {
  const email = request.params.email;
  return new Promise(function (resolve, reject) {
    pool.query(
      `select 
      *
      from activity u 
      where u."owner" = '${email}' 
      ORDER BY u.time DESC `,
      (error, results) => {
        if (error || results.rows === undefined) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

const getStudentLastActivity = (request) => {
  const email = request.params.email;
  return new Promise(function (resolve, reject) {
    pool.query(
      `select 
      u.type,
      u.info,
      u.time
      from activity u 
      where u."owner" = '${email}' 
      ORDER BY u.time DESC    
      limit 1`,
      (error, results) => {
        if (error || results.rows === undefined) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

module.exports = {
  getStudentInfo,
  getStudentActivity,
  getStudentLastActivity,
};
