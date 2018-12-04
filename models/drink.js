module.exports = function(sequelize, DataTypes){
    return sequelize.define('drink',{
        drinkName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        drinkSize:{
            type:DataTypes.STRING,
        },
        espresso:{
            type:DataTypes.STRING,
        },
        milkOptions:{
            type:DataTypes.STRING
        },
        foam:{
            type:DataTypes.BOOLEAN,
        },
        drinkDescription:{
            type:DataTypes.STRING,
        }
    })
}