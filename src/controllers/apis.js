const connection = require("../../database/dbConn");
const controller = {};

controller.list = async (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, usuarios) => {
        if (err) {
            res.json(err);
        }
        res.render('customers', {
            data: usuarios
        });
    })
}

module.exports = controller;