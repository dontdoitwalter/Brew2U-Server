let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let User = sequelize.import('../models/user');
const validateSesh = require('../middleware/validateSession');

//CREATE NEW USER//
router.post('/signup', function(req, res){
    let UserName = req.body.user.username;
    let Password = req.body.user.password;
    let Email = req.body.user.email;
    let Address = req.body.user.userAddress;
    let SecondAddress = req.body.user.userSecondAddress;
    let State = req.body.user.userState;
    let City = req.body.user.userCity;
    let Zipcode = req.body.user.userZipcode;
    let PhoneNumber = req.body.user.phoneNumber;
    let FirstName = req.body.user.firstName;
    let LastName = req.body.user.lastName;
    let Administrator = req.body.user.isAdmin;

    User.create({
        username:UserName,
        password:bcrypt.hashSync(Password,10),
        email:Email,
        userAddress:Address,
        phoneNumber:PhoneNumber,
        userSecondAddress:SecondAddress,
        userState:State,
        userCity:City,
        userZipcode:Zipcode,
        firstName:FirstName,
        lastName:LastName,
        isAdmin:Administrator,
    }).then(
        function createUser(user){
            let token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:60*60*24});
            res.json({
                user:user.id,
                message:'user created',
                sessionToken:token
            });
        },
        function createError(err){
            res.send(500,err.message)
        });
});
//LOG IN WITH EXISTING ACCOUNT//
router.post('/login', function(req,res){

    User.findOne(
        {where:{username:req.body.user.username}}
    ).then(
        function(user){
            if(user){
                bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                    if(matches){
                        let token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:60*60*24});
                        res.json({
                            user:user.id,
                            message:'successfully logged in',
                            sessiontoken:token
                        })
                    }else{
                        res.status(502).send({error:'wrong password'});
                    }
                });
            }else{
                res.status(500).send({error:'wrong username'});
            }
        },
        function(err){
            res.status(501).send({error:'something else is broken'})
        });
});

//GET ONE USERS PROFILE INFO//
router.get('/info/:id', validateSesh, function(req, res){
    let userid = req.user.id;

    User.findOne({
        where:{id:userid}
    }).then(
        function findUser(data){
            res.json({
                user:data
            });
        },
        function findFail(err){
            res.send(500,err.message)
        });
});
//GET DRINKS FOR ONE USER//
router.get('/:id/pastorders', validateSesh, function(req, res){
    User.findOne({
        where:{id:req.user.id}, include: [{all:true}]
    }).then(
        function pastOrders(data){
            res.json({
                data
            })
        },
        function errorHandle(err){
            res.send(500, err.message)
        });
});

//GET ALL USERS//
router.get('/allusers', validateSesh, function(req, res){
    User.findAll({

    }).then(
        function findUsers(data){
            res.json({
                data
            })
        },
        function findFailed(err){
            res.send(500, err.message)
        });
});

//DELETE USER//
router.delete('/delete/:id', validateSesh, function(req, res){
    let userid = req.params.id;
    console.log(userid)

    User.destroy({
        where:{id:userid}
    }).then(
        function deleteSuccess(){
            res.send('account deleted')
        },
        function deleteError(err){
            res.send(500, err.message);
        });
});

//UPDATE USER INFO//
router.put('/update/:id', validateSesh, function(req,res){
    let id = req.user.id;
    let UserName = req.body.user.username;
    let Email = req.body.user.email;
    let Address = req.body.user.userAddress;
    let SecondAddress = req.body.user.userSecondAddress;
    let State = req.body.user.userState;
    let City = req.body.user.userCity;
    let Zipcode = req.body.user.userZipcode;
    let PhoneNumber = req.body.user.phoneNumber;
    let FirstName = req.body.user.firstName;
    let LastName = req.body.user.lastName;
    
    User.update({
        username:UserName,
        email:Email,
        userAddress:Address,
        userSecondAddress:SecondAddress,
        userState:State,
        userCity:City,
        userZipcode:Zipcode,
        phoneNumber:PhoneNumber,
        firstName:FirstName,
        lastName:LastName,
    },
    {where:{id:id}}
    ).then(
        function updateSuccess(data){
            res.json({
                message:'your profile has been updated'
            })
        },
        function updateError(err){
            res.send(500,err.message)
        });
});

module.exports = router;