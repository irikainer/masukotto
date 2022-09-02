const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if (err) {
                res.json(err);
            }
            console.log(usuarios.NombreUsuario)
            res.render('customers', {
                data: usuarios
            });
        })
    });
};

module.exports = controller;