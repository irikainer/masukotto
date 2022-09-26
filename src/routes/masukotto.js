const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const userSessionController = require('../controllers/userSession');

router.get("/inicioSesion", (req, res) => {
    res.render("inicioSesion", { alert: false })
});

router.get("/recuperarPassword", (req, res) => {
    res.render("recuperarPassword", { alert: false })
});

router.get("/", userSessionController.isAuthenticated, (req, res) => {
    res.render('home', { session: req.session });
});
router.get('/register', function (req, res) {
    res.render('newUser', {alert: false});
});
router.get('/profile/:id', userSessionController.isAuthenticated, userController.edit);



router.post("/inicioSesion", userSessionController.login);
router.get("/logout", userSessionController.isAuthenticated, userSessionController.logout);
router.post("/recuperarPassword", userSessionController.forget);

const controller = require('../controllers/apis');
router.get("/users", controller.usersList);
router.get("/dayCares", controller.dayCaresList);

router.post('/registerUser', userController.save);
router.post('/update/:id', userController.update);
const mascota = require('../controllers/mascotas');

router.get('/');
router.get('/petlist', mascota.list);
router.post('/petadd', mascota.add);

module.exports = router;