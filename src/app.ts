const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

import { Request, Response, NextFunction } from "express";

import { PORT } from "./const";

const app = express();
const port: number = +process.env.PORT || PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
