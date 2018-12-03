let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let User = sequelize.import('../models/user');
const validateSesh = require('../middleware/validateSession');

router.post('/signup', function(req, res){
    let UserName = req.body.user.username;
    let Password = req.body.user.password;
    let Email = req.body.user.email;
})