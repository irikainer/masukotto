const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require("cookie-parser")
// const mysql = require('mysql');
// const myConnection = require('express-myconnection')

const app = express();

//importing routes
const customerRoutes = require('./routes/masukotto');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//     host: 'localhost',
//     user: 'root',
//     password: 'julian123',
//     database: 'masukotto'
// }, 'single'));
app.use(cookieParser())
// routes
app.use('/', customerRoutes);
app.use('/inicioSesion', customerRoutes);
app.use('/registroUsuario', customerRoutes);


// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('masukotto');
});