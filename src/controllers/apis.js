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

controller.dayCareList = (req, res) => {
    connection.query('SELECT * FROM guarderias', (err, dayCares) => {
        if (err) res.json(err);

        res.render('dayCares', {
            data: dayCares, 
            alert: false 
        });
    })
}

controller.hideItem = (req,res) => {
    const {id} = req.params
    connection.query('DELETE FROM usuarios WHERE idUsuario = ?', [id], (err, user) => {
        if (dayCare) {
            console.log("Error en la query lista de guarderias")
            res.render("customers", {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "¿Desea eliminar la guarderia?",
                alertIcon: "info",
                showConfirmButton: true,
                timer: 800,
                ruta: "customers"
            });
        } 
        res.render('customers', {
            data: user
        });

        res.redirect('/users');
    })
}



module.exports = controller;