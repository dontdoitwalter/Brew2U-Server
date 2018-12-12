require('dotenv').config();
let express = require('express');
let app = express();
const { PORT } = process.env;
// let sequelize = require('./db');
let bodyParser = require('body-parser');
let user = require('./controllers/usercontroller');
let drink = require('./controllers/drinkcontroller');
let store = require('./controllers/storecontroller')

require('./models')

app.listen(process.env.PORT,()=>{console.log(`server is listening on port ${process.env.PORT}`)});

app.use(require('./middleware/headers'));

app.use(bodyParser.json());

app.use('/drink',drink)
app.use('/store',store)
app.use('/user', user)
// app.use('*/*',(req, res) => {
//     res.send({msg:'This is not a route'})
// })