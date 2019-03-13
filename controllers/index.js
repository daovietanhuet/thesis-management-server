const express = require('express');
const app = express();
const router = express.Router();
const Login = require('./AuthService/login');
const LecturerThesis = require('./LecturerService/lecturerThesis');
const StudentThesis = require('./StudentService/studentThesis');

app.use('/', Login.registerRoute(router));
app.use('/', LecturerThesis.registerRoute(router));
app.use('/', StudentThesis.registerRoute(router));


module.exports = router;
