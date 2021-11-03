const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const student_model = require("./student_modal");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", function (req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello World");
});

app.get("/student/info/:email", (req, res) => {
  student_model
    .getStudentInfo(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/student/activity/:email", (req, res) => {
  student_model
    .getStudentActivity(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/student/lastactivity/:email", (req, res) => {
  student_model
    .getStudentLastActivity(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/student/lastactivities/3weeks/:email", (req, res) => {
  student_model
    .getStudentLastThreeWeekActivity(req)
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
