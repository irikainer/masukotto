const userController = {};

userController.save = (req, res) => {
    const data = Object.values(req.body);
    console.log('body req', req.body)
    req.getConnection((err, connection) => {
        const query = connection.query(`INSERT INTO usuarios (idTipoUsuario, NombreUsuario, ApellidoUsuario, MailUsuario, PassUsuario) VALUES (?, ?, ?, ?, ?)`, data,
            (err, customer) => {
                console.log(err)
                console.log(customer)
                res.redirect('/');
            })
    })
};

module.exports = userController;