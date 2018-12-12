module.exports = function(sequelize, DataTypes){
    const Drink = sequelize.define('drink',{
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
    Drink.associate = models => {
        Drink.belongsTo(models['user'])
    }
    return Drink
}