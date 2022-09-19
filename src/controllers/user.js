const userController = {};
const connection = require("../../database/dbConn");
userController.save = (req, res) => {
    const data = Object.values(req.body);
    connection.query(`INSERT INTO usuarios (idTipoUsuario, NombreUsuario, ApellidoUsuario, MailUsuario, PassUsuario, TelefonoUsuario, ProvinciaUsuario, LocalidadUsuario, CPUsuario, DomCalleUsuario, DomNumUsuario, DomPisoDptoUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data,
        (err, customer) => {
            res.redirect('/');
        })
};

userController.edit = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, rows) => {
        res.render('profile', {
            data: rows[0]
        })
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