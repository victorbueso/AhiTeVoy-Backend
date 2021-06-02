const express = require('express');

var app = express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on ${process.env.PORT || 3000} port!`);
});