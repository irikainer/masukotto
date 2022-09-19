const userController = {};
const connection = require("../../database/dbConn");

userController.save = (req, res) => {
    const data = Object.values(req.body);
    connection.query(`INSERT INTO usuarios (idTipoUsuario, NombreUsuario, ApellidoUsuario, MailUsuario, PassUsuario, TelefonoUsuario, ProvinciaUsuario, LocalidadUsuario, CPUsuario, DomCalleUsuario, DomNumUsuario, DomPisoDptoUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data,
        (err, customer) => {
            res.render('inicioSesion', {
                alert: true,
                alertTitle: "Usuario registrado con éxito",
                alertMessage: "Iniciá sesión para comenzar",
                alertIcon: "success",
                showConfirmButton: true,
                timer: false,
                ruta: "inicioSesion"
            });
            if (err) {
                res.render("newUser", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Ocurrió un error al intentar registrar nuevo usuario",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: "register"
                });
            }
        })
};

userController.edit = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, rows) => {
        if (rows) {
            res.render('profile', {
                session: req.session,
                data: rows[0]
            })
        }
    });
}

userController.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    connection.query('UPDATE usuarios set ? where idUsuario = ?', [newCustomer, id], (err, rows) => {
        res.redirect('/');
    });
};

module.exports = userController;