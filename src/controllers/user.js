const userController = {};

userController.save = (req, res) => {
    const data = Object.values(req.body);
    req.getConnection((err, connection) => {
        const query = connection.query(`INSERT INTO usuarios (idTipoUsuario, NombreUsuario, ApellidoUsuario, MailUsuario, PassUsuario, TelefonoUsuario, ProvinciaUsuario, LocalidadUsuario, CPUsuario, DomCalleUsuario, DomNumUsuario, DomPisoDptoUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data,
            (err, customer) => {
                res.redirect('/');
            })
    })
};

userController.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, rows) => {
            res.render('profile', {
                data: rows[0]
            })
        });
    });
};

userController.update = (req, res) => {
    const { id } = 2;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE usuarios set ? where idUsuario = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = userController;