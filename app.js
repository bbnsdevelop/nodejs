const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// string de conexão 
const url = 'mongodb+srv://usuario_admin:6559279bb2@clusterapi-2jqic.mongodb.net/test?retryWrites=true&w=majority'
const options = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url, options);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) =>{
    console.log('Erro na conexão com o banco de dados: ' + err);
})
mongoose.connection.on('disconnected', () =>{
    console.log('Aplicação desconectada di banco de dados!');
})

mongoose.connection.on('connected', () =>{
    console.log('sucesso ao se conectar com a base!');
})

// BODY Parse
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const userRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', userRoute);

app.listen(3000);

module.exports = app;