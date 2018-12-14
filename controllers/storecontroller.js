let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Store = sequelize.import('../models/store');
const validateSesh = require('../middleware/validateSession');
//CREATE NEW STORE//
router.post('/create', validateSesh, function(req, res){
    let StoreName = req.body.store.storeName;
    let StreetAddress = req.body.store.streetAddress;
    let StoreState = req.body.store.storeState;
    let StoreCity = req.body.store.storeCity;
    let StoreZip = req.body.store.storeZip;
    let StorePhone = req.body.store.storePhone;
    let StoreHours = req.body.store.storeHours;

    Store.create({
        storeName:StoreName,
        streetAddress:StreetAddress,
        storeState:StoreState,
        storeCity:StoreCity,
        storeZip:StoreZip,
        storePhone:StorePhone,
        storeHours:StoreHours,
    }).then(
        function createStore(store){
            res.json({
                data:store,
                message:'store created'
            });
        },
        function storeError(err){
            res.send(500,err.message)
        });
});

//GET ONE STORE//
router.get('/show/:id', function(req, res){
    let id = req.params.id;

    Store.findOne({
        where:{id:id}
    }).then(
        function findStore(data){
            res.json({
                store:data
            });
        },
        function searchFail(err){
            res.send(500, err.message)
        });
});

//GET ALL STORES//
router.get('/showall', function(req, res){
    Store.findAll({

    }).then(
        function findAllStores(data){
            res.json({
                stores:data
            })
        },
        function findStoresFail(err){
            res.send(500,err.message)
        });
});

//UPDATE STORE INFO//
router.put('/update/:id', validateSesh, function(req, res){
    let id = req.params.id;
    let StoreName = req.body.store.storeName;
    let StreetAddress = req.body.store.streetAddress;
    let StoreState = req.body.store.storeState;
    let StoreCity = req.body.store.storeCity;
    let StoreZip = req.body.store.storeZip;
    let StorePhone = req.body.store.storePhone;
    let StoreHours = req.body.store.storeHours;

    Store.update({
        storeName:StoreName,
        streetAddress:StreetAddress,
        storeState:StoreState,
        storeCity:StoreCity,
        storeZip:StoreZip,
        storePhone:StorePhone,
        storeHours:StoreHours,
    },
    {where:{id:id}}
    ).then(
        function storeUpdateSuccess(data){
            res.json({
                message:'you have updated this store'
            })
        },
        function storeUpdateError(err){
            res.send(500,err.message)
        });
});

//DELETE A STORE//
router.delete('/delete/:id', validateSesh, function(req, res){
    let id = req.params.id;

    Store.destroy({
        where:{id:id}
    }).then(
        function deleteStoreSuccess(){
            res.send('store deleted')
        },
        function storeDeleteError(err){
            res.send(500,err.message);
        });
});
module.exports = router;