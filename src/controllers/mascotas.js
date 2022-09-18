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
    res.render('mascotas', { data: 'listaMascotas' });

}


module.exports = mascota;