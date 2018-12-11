module.exports = function(sequelize, DataTypes){
    return sequelize.define('drink',{
        owner:{
            type:DataTypes.INTEGER,
        },
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
        
        drinkDescription:{
            type:DataTypes.STRING,
        }
    })
}