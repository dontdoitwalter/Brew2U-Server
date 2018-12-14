module.exports = function(sequelize, DataTypes){
    return sequelize.define('store',{
        storeName:{
            type:DataTypes.STRING
        },
        streetAddress:{
            type:DataTypes.STRING
        },
        storeState:{
            type:DataTypes.STRING
        },
        storeCity:{
            type:DataTypes.STRING
        },
        storeZip:{
            type:DataTypes.INTEGER
        },
        storePhone:{
            type:DataTypes.STRING
        },
        storeHours:{
            type:DataTypes.STRING
        }
    })
}