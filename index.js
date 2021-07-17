const express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

let database = require('./modules/database');

//Definicion de Routes
let motoristarRouter = require('./routes/auth-motorista');

var app = express();

//Middleware (Debe ingresarse respectivamente en el orden establecido.)
app.use(cors());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Rutas
app.use('/auth/motorista', motoristarRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on ${process.env.PORT || 3000} port!`);
});