const express = require('express');
const app = express();
const router = express.Router();
const Login = require('./AuthService/login');

app.use('/', Login.registerRoute(router));


module.exports = router;
