const mongoose = require('mongoose');

let db = 'deliveryDB';
let port = '27017';
let host = 'localhost';
class Database {
    constructor () {
            mongoose.connect(`mongodb+srv://delivery:delivery@projectdw.jiymq.mongodb.net/deliveryDB?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
            )
            //mongoose.connect(`mongodb+srv://delivery:delivery@projectdw.ar2xk.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true })
            //mongoose.connect(`mongodb://${host}:${port}/${db}`, {useNewUrlParser:true, useUnifiedTopology:true})
            .then(result => console.log(`Se conectó a MongoDB`))
            .catch(error => console.log(error));
        }
}

module.exports = new Database();