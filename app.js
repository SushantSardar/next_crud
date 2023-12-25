const express = require("express");
const cors = require("cors");

const app = express();
//using them in by making it function
app.use(express.json());
app.use(cors());

const mail = require('./routes/mail');

app.use('/mail', mail);

module.exports = app;


