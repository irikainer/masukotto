const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const userSessionController = require('../controllers/userSession');
const mascota = require('../controllers/mascotas');
const guarderia = require('../controllers/guarderias');



router.get("/inicioSesion", (req, res) => {
    res.render("inicioSesion", { alert: false })
});

router.get("/recuperarPassword", (req, res) => {
    res.render("recuperarPassword", { alert: false })
});

router.get("/", userSessionController.isAuthenticated, (req, res) => {
    res.render('home', { session: req.session });
});
router.get('/register', function(req, res) {
    res.render('newUser');
});
router.get('/profile/:id', userSessionController.isAuthenticated, userController.edit);



router.get("/logout", userSessionController.isAuthenticated, userSessionController.logout);
router.post("/inicioSesion", userSessionController.login);
router.post("/recuperarPassword", userSessionController.forget);

const controller = require('../controllers/apis');
router.get("/users", userSessionController.isAuthenticated, controller.usersList);
router.get("/dayCares", controller.dayCaresList);
router.get('/deleteUser/:id', controller.hideUsers);
router.get('/deleteDayCare/:id', controller.hideDayCares);

router.post('/registerUser', userController.save);
router.post('/update/:id', userController.update);


router.get('/');
router.get('/mascotas/:id', userSessionController.isAuthenticated, mascota.list);
router.post('/mascotas/:id/petadd', userSessionController.isAuthenticated, mascota.add);
router.post('/mascotas/petupdate/:id', userSessionController.isAuthenticated, mascota.update);
router.post('/mascotas/petdelete/:id', userSessionController.isAuthenticated, mascota.delete);

router.get('/guarderias/:id', userSessionController.isAuthenticated, guarderia.list);
router.post('/guarderias/:id/careadd', userSessionController.isAuthenticated, guarderia.add);
router.post('/guarderias/careupdate/:id', userSessionController.isAuthenticated, guarderia.update);
router.post('/guarderias/caredelete/:id', userSessionController.isAuthenticated, guarderia.delete);
router.get('/guarderiasall', guarderia.listall);

module.exports = router;