const express = require('express');
const app = express();
const router = express.Router();
const Login = require('./AuthService/login');
const LecturerThesis = require('./LecturerService/lecturerThesis');

app.use('/', Login.registerRoute(router));
app.use('/', LecturerThesis.registerRoute(router));


module.exports = router;
