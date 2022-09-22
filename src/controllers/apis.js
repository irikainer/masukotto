const connection = require("../../database/dbConn");
const controller = {};

controller.usersList = (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, usuarios) => {
        if (err) {
            res.json(err);
        }
        res.render('customers', {
            data: usuarios
        });
    })
}

controller.dayCaresList = (req, res) => {
    connection.query('SELECT * FROM guarderias', (err, daycares) => {
        if (err) {
            res.json(err);
        }
        res.render('dayCares', {
            data: daycares
        });
    })
}

module.exports = controller;