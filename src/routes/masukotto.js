const express = require('express');
const router = express.Router();
const path = require("path");

const apis = require('../controllers/apis');
const userController = require('../controllers/user');

router.get('/', apis.isAuthenticated, apis.list);

router.get("/inicioSesion", (req, res) => {
    // res.setHeader("Content-Type", "text/html");
    // res.sendFile(path.resolve(__dirname, "../views/inicioSesion.ejs"));
    res.render("inicioSesion", { alert: false })
});

router.get("/registroUsuario", (req, res) => {
    // res.setHeader("Content-Type", "text/html");
    // res.sendFile(path.resolve(__dirname, "../views/registroUsuario.ejs"));
    res.render("registroUsuario")
});

router.get("/recuperarPassword", (req, res) => {
    res.render("recuperarPassword", { alert: false })
})

router.post("/registroUsuario", apis.register);
router.post("/inicioSesion", apis.login);
router.get("/logout", apis.logout);
router.post("/recuperarPassword", apis.forget);

router.post('/registerUser', userController.save);
router.get('/profile/:id', userController.edit);
router.post('/update/:id', userController.update);
const mascota = require('../controllers/mascotas');

router.get('/', apis.list);
router.get('/petlist', mascota.list);
router.post('/petadd', mascota.add)

module.exports = router;