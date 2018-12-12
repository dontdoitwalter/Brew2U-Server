const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:'postgres'
});

const Drink = sequelize.import('./models/drink');


const User = sequelize.import('./models/user');

Drink.belongsTo(User);
User.hasMany(Drink);









module.exports = sequelize;