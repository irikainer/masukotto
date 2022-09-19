const express = require('express');
const router = express.Router();
const path = require("path");

const apis = require('../controllers/apis');

router.get('/', apis.isAuthenticated, apis.list);

router.get("/inicioSesion", (req, res) => {
    // res.setHeader("Content-Type", "text/html");
    // res.sendFile(path.resolve(__dirname, "../views/inicioSesion.ejs"));
    res.render("inicioSesion", {alert: false})
});
  
router.get("/registroUsuario", (req, res) => {
    // res.setHeader("Content-Type", "text/html");
    // res.sendFile(path.resolve(__dirname, "../views/registroUsuario.ejs"));
    res.render("registroUsuario")
});

router.get("/recuperarPassword", (req, res) => {
    res.render("recuperarPassword", {alert: false})
})

router.post("/registroUsuario", apis.register);
router.post("/inicioSesion", apis.login);
router.get("/logout", apis.logout);
router.post("/recuperarPassword", apis.forget);

<<<<<<< Updated upstream
=======
// router.get('/users', function(req, res) {
//     res.render('customers');
// });

// router.get('/dayCares', function(req, res) {
//     res.render('dayCares');
// });

const controller = require('../controllers/apis');
router.get('/users', controller.usersList);
router.get('/dayCares', controller.dayCareList);

// router.get('/users', function(req, res) {
//     res.render('customers');
// });

// router.get('/dayCares', function(req, res) {
//     res.render('dayCares');
// });

const controller = require('../controllers/apis');
router.get('/users', controller.usersList);
router.get('/dayCares', controller.dayCareList);

router.post("/inicioSesion", userSessionController.login);
router.get("/logout", userSessionController.isAuthenticated, userSessionController.logout);
router.post("/recuperarPassword", userSessionController.forget);


router.post('/registerUser', userController.save);
router.get('/profile/:id', userController.edit);
router.post('/update/:id', userController.update);
const mascota = require('../controllers/mascotas');

router.get('/');
router.get('/petlist', mascota.list);
router.post('/petadd', mascota.add);
>>>>>>> Stashed changes

module.exports = router;