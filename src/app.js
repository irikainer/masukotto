const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
/* const bootstrap = require('bootstrap');
const popper = require('popper'); */
const app = express();

app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

//importing routes
const customerRoutes = require('./routes/masukotto');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(multer({
    dest: path.join(__dirname, 'public/uploads'),
    limits: { fileSize: 1000000 },
    filename: function (req, foto, cb) { cb(null, foto.fieldname + "-" + Date.now() + path.extname(foto.originalname)) }
}).single('foto'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
/* app.use(express.static(__dirname + '/public')); */
// routes
app.get("/", (req, res) => {
    res.render('home', { session: req.session });
});
app.get('/register', function (req, res) {
    res.render('newUser', { session: req.session });
});
app.get('/profile/', function (req, res) {
    res.render('profile', { session: req.session });
});

app.use('/', customerRoutes);
app.use('/inicioSesion', customerRoutes);
app.use('/register', customerRoutes);
app.use('/profile/:id', customerRoutes);

app.listen(app.get('port'), () => {
    console.log('masukotto');
});