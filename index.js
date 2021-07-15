const express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');

/* Definicion de Routes */
let motoristarRouter = require('./routes/auth-motorista');

var app = express();
app.use(cors());

//Middleware (Debe ingresarse respectivamente en el orden establecido.)

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Lectura
app.use( express.json() );
//Rutas
app.use('/auth/motorista', motoristarRouter);


app.get('/', ( req, res )=>{
    res.json({
        ok: true,
        msg: 'Todo salio bien'
    })
});

//Levantar server.
app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on ${process.env.PORT || 3000} port!`);
});