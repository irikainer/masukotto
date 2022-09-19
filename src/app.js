const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require("cookie-parser")
    //const myConnection = require('express-myconnection')
const multer = require('multer')
const mysql = require('mysql2');
//const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const app = express();

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

//importing routes
const customerRoutes = require('./routes/masukotto');

// settings
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));
// app.use(myConnection(mysql, {
//     host: 'localhost',
//     user: 'root',
//     password: 'julian123',
//     database: 'masukotto'
// }, 'single'));
app.use(cookieParser())
    // routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({
    dest: path.join(__dirname, 'public/uploads'),
    limits: { fileSize: 1000000 }
}).single('foto'));

// routes
app.get("/", (req, res) => {
    res.render('home');
});
app.get('/register', function(req, res) {
    res.render('newUser');
});
app.get('/profile/:id', function(req, res) {
    res.render('profile');
});

app.use('/', customerRoutes);
app.use('/inicioSesion', customerRoutes);
app.use('/registroUsuario', customerRoutes);
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('masukotto');
});