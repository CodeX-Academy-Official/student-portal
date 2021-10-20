const express = require('express');
const app = express();
const port = 3001;

const student_model = require('./student_modal');

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  next();
});

app.get('/student/:email', (req, res) => {
  student_model
    .getStudentInfo(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
