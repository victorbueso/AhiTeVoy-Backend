const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./modules/database');
const clienteRouter = require('./routes/clientes-router');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cliente', clienteRouter);

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on ${process.env.PORT || 3000} port!`);
});