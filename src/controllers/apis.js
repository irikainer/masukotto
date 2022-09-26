const connection = require("../../database/dbConn");
const controller = {};

controller.usersList = (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, usuarios) => {
        if (err) {
            res.json(err);
        }
        res.render('customers', {
            data: usuarios,
            session: req.session 
        });
    })
}

controller.dayCaresList = (req, res) => {
    connection.query('SELECT * FROM guarderias', (err, daycares) => {
        if (err) {
            res.json(err);
        }
        res.render('dayCares', {
            data: daycares,
            session: req.session 
        });
    })
}

controller.hideUsers = (req,res) => {
    const {id} = req.params
    connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [id], (err, user) => {
        if (user) {
            res.redirect('/users');
        }
    })
}

controller.hideDayCares = (req,res) => {
    const {id} = req.params
    connection.query('DELETE FROM guarderias WHERE idGuarderia = ?', [id], (err, dayCare) => {
        if (dayCare) {
            res.redirect('/dayCares');
        }
    })
}

module.exports = controller;