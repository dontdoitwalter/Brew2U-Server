require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let bodyParser = require('body-parser');
let user = require('./controllers/usercontroller');
let drink = require('./controllers/drinkcontroller');


sequelize.sync();
app.use(require('./middleware/headers'));
app.use(bodyParser.json());
app.listen(process.env.PORT,()=>{console.log(`server is listening on port ${process.env.PORT}`)});


app.use('/user', user)