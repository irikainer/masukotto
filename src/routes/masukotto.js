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

router.post("/registroUsuario", apis.register);
router.post("/inicioSesion", apis.login);
router.get("/logout", apis.logout);


module.exports = router;