let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Drink = sequelize.import('../models/drink');
const validateSesh = require('../middleware/validateSession');

//CREATE A NEW DRINK//
router.post('/create', validateSesh, function(req, res){
    let Name = req.body.drink.drinkName;
    let Price = req.body.drink.price;
    let Size = req.body.drink.drinkSize;
    let Description = req.body.drink.drinkDescription;

    Drink.create({
        drinkName:Name,
        price:Price,
        drinkSize:Size,
        drinkDescription:Description
    }).then(
        function createDrink(drink){
            res.json({
                data:drink,
                message:'drink created'
            });
        },
        function createError(err){
            res.send(500,err.message)
        });
});

//GET ALL DRINKS FOR ONE USER//
router.get('/getall', validateSesh, function(req, res){
    let id = req.user.id
    Drink.findAll({
        where:{owner:id}
    }).then(
        function findUserDrinks(data){
            res.json(data);
        },
        function findError(err){
            res.send(500,err.message)
        });
});

//GET ONE DRINK//
router.get('/getdrink/:id',function(req, res){
    let id = req.params.id;

    Drink.findOne({
        where:{id:id}
    }).then(
        function findDrink(data){
            res.json(data);
        },
        function findFail(err){
            res.send(500,err.message)
        });
});

//GET ALL THE DRINKS CREATED//
router.get('/alldrinks', function(req, res){
    Drink.findAll({

    }).then(
        function findDrinks(data){
            res.json({
                drink:data
            })
        },
        function findDrinkFail(err){
            res.send(500, err.message)
        });
});

//DELETE A DRINK//
router.delete('/delete/:id',validateSesh, function (req, res){
    let id =req.params.id
    Drink.destroy({
        where:{id:id}
    }).then(
        function deleteDrinkSuccess(){
            res.send('this drink deleted')
        },
        function deleteDrinkFail(err){
            res.send(500, err.message);
        });
});

//UPDATE A DRINK//
router.put('/updatedrink/:id', validateSesh, function(req, res){
    let id = req.params.id;
    let Name = req.body.drink.drinkName;
    let Price = req.body.drink.price;
    let Size = req.body.drink.drinkSize;
    let Description = req.body.drink.drinkDescription;

    Drink.update({
        drinkName:Name,
        price:Price,
        drinkSize:Size,
        drinkDescription:Description
    },
    {where:{id:id}}
    ).then(
        function drinkUpdateSuccess(data){
            res.json({
                message:'drink updated'
            })
        },
        function drinkUpdateError(err){
            res.send(500,err.message)
        });
});
module.exports = router;