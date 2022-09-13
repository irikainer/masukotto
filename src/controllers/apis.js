const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: usuarios
            });
        })
    });
};


module.exports = controller;