const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const clientesRouter = require('./routes/clientes-router');
const empresasRouter = require('./routes/empresas-router');
const productosRouter = require('./routes/productos-router');
const categoriasRouter = require('./routes/categorias-router');
const adminRouter = require('./routes/auth-admin');
const ordenesRouter = require('./routes/ordenes-router');
const motoristarouter = require('./routes/motorista-router');
require('dotenv').config();


let database = require('./modules/database');

//Definicion de Routes
let motoristarRouter = require('./routes/auth-motorista');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origins: ['https://localhost:3000']
    }
});


//Middleware (Debe ingresarse respectivamente en el orden establecido.)
app.set('socketio', io);
app.use(cors());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Rutas
app.use('/auth/motorista', motoristarRouter);
app.use('/cliente', clientesRouter);
app.use('/categoria', categoriasRouter);
app.use('/empresas', empresasRouter);
app.use('/productos', productosRouter);
app.use('/admin', adminRouter);
app.use('/ordenes', ordenesRouter);
app.use('/motorista', motoristarouter);
app.use('/uploads', express.static(path.resolve('uploads')));
module.exports = {
    io
}
require('./sockets/socket');

server.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on ${process.env.PORT || 3000} port!`);
});