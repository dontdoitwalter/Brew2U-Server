let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Drink = sequelize.import('../models/drink');
const validateSesh = require('../middleware/validateSession');


router.post('/create', validateSesh, function(req, res){
    let Name = req.body.drinkName;
    let Price = req.body.price;
    let Size = req.body.drinkSize;
    let Espresso = req.body.espresso;
    let Milk = req.body.milkOptions;
    let Foam = req.body.foam;
    let Description = req.body.drinkDescription;

    Drink.create({
        drinkName:Name,
        price:Price,
        drinkSize:Size,
        espresso:Espresso,
        milkOptions:Milk,
        foam:Foam,
        drinkDescription:Description
    }).then(
        function createDrink(drink){
            res.json({
                drink:drink,
                message:'drink created'
            });
        },
        function createError(err){
            res.send(500,err.message)
        }
    )
})
module.exports = router;