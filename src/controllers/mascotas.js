const mascota = {};

mascota.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT f.RutaFoto, f.DescripcionFoto, m.idMascota, m.idUsuario, m.NombreMascota, m.EspecieMascota, m.RazaMascota, m.AnioNacimientoMascota, m.AlimentoMascota, m.EnfermedadesMascota, m.VetNombreMascota, m.EstadoMascota FROM masukotto.mascotas m LEFT JOIN masukotto.fotos f ON m.idMascota = f.idMascota AND EstadoFoto = "Activa" AND PrincipalFoto = "Si" WHERE m.idUsuario = 8', (err, listaMascotas) => {
            if (err) {
                res.json(err);
            }
            res.render('mascotas', { data: listaMascotas });
        })
    });
};

mascota.add = (req, res) => {
    const data = Object.values(req.body);
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO mascotas (idUsuario, NombreMascota, EspecieMascota,RazaMascota,AnioNacimientoMascota,AlimentoMascota,EnfermedadesMascota,VetNombreMascota,VetTelMascota,EstadoMascota) VALUES (8,?,?,?,?,?,?,?,?,"Activa")', data,
            (err, asd) => {
                res.redirect('petlist');
            })
    })
}


module.exports = mascota;