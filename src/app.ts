const express = require("express");
const bodyParser = require("body-parser");

import { Request, Response, NextFunction } from "express";

import { PORT } from "./const";
import { db } from "./db";
import { Teacher } from "./models";

const app = express();
const port: number = +process.env.PORT || PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

//get all
app.get("/teachers", (req: Request, res: Response) => {
  db.getConnection((err: Error, connection: any) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.query("SELECT * from teachers", (err: Error, rows: any) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
        res.status(500).send({ error: err });
      }
    });
  });
});

//get by id
app.get("/teachers/:id", (req: Request, res: Response) => {
  db.getConnection((err: Error, connection: any) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    const id: string = req.params.id;
    connection.query(
      "SELECT * from beers WHERE id = ?",
      [id],
      (err: Error, rows: any) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
          res.status(500).send({ error: err });
        }
      }
    );
  });
});

//delete a record
app.delete("/teachers/:id", (req: Request, res: Response) => {
  db.getConnection((err: Error, connection: any) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    const id: string = req.params.id;
    connection.query(
      "DELETE from beers WHERE id = ?",
      [id],
      (err: Error, rows: any) => {
        if (!err) {
          res.send(`Teacher with id: ${id} has been deleted.`);
        } else {
          console.log(err);
          res.status(500).send({ error: err });
        }
      }
    );
  });
});

//post a record
app.post("/teachers", (req: Request, res: Response) => {
  db.getConnection((err: Error, connection: any) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    const {
      name,
      surname,
      subject,
      canTeachSubjects,
      age,
      yearsOfExperience,
      workedInUniversities,
      sex,
    }: Teacher = req.body;
    if (
      !name ||
      !surname ||
      !subject ||
      !canTeachSubjects ||
      !age ||
      !yearsOfExperience ||
      !workedInUniversities ||
      !sex
    )
      return res.status(400).send(`Some of the parameters are missing.`);
    connection.query(
      "INSERT INTO teachers SET ?",
      {
        name,
        surname,
        subject,
        canTeachSubjects,
        age,
        yearsOfExperience,
        workedInUniversities,
        sex,
      },
      (err: Error, rows: any) => {
        if (!err) {
          res.send(`Teacher with name: ${name} has been added.`);
        } else {
          console.log(err);
          res.status(500).send({ error: err });
        }
      }
    );
  });
});

//update a record
app.put("/teachers", (req: Request, res: Response) => {
  db.getConnection((err: Error, connection: any) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const {
      name,
      surname,
      subject,
      canTeachSubjects,
      age,
      yearsOfExperience,
      workedInUniversities,
      sex,
    }: Teacher = req.body;
    if (
      !name ||
      !surname ||
      !subject ||
      !canTeachSubjects ||
      !age ||
      !yearsOfExperience ||
      !workedInUniversities ||
      !sex
    )
      return res.status(400).send(`Some of the parameters are missing.`);

    connection.query(
      "UPDATE teachers SET name ? surname ? subject ? canTeachSubjects ? age ? yearsOfExperience ?       workedInUniversities ? sex ?",
      [
        name,
        surname,
        subject,
        canTeachSubjects,
        age,
        yearsOfExperience,
        workedInUniversities,
        sex,
      ],
      (err: Error, rows: any) => {
        if (!err) {
          res.send(`Teacher with name: ${name} has been updated.`);
        } else {
          console.log(err);
          res.status(500).send({ error: err });
        }
      }
    );
  });
});

/* query for getTargetMathTeachers

SELECT * from teachers, schedule 
WHERE
teachers.id = schedule.teacher.id 
AND 
teachers.subject = Math 
AND 
teachers.yearsOfExperience > 10
AND 
schedule.classroom.number = 10
AND 
schedule.dayOfWeek = Thursday
AND
schedule.time = lecture1 OR schedule.time = lecture2 OR schedule.time = lecture3 OR schedule.time = lecture4

*/
