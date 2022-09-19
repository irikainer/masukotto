const mascota = {};
const connection = require("../../database/dbConn");
mascota.list = (req, res) => {
    connection.query('SELECT f.RutaFoto, f.DescripcionFoto, m.idMascota, m.idUsuario, m.NombreMascota, m.EspecieMascota, m.RazaMascota, m.AnioNacimientoMascota, m.AlimentoMascota, m.EnfermedadesMascota, m.VetNombreMascota, m.EstadoMascota FROM masukotto.mascotas m LEFT JOIN masukotto.fotos f ON m.idMascota = f.idMascota AND EstadoFoto = 1 AND DescripcionFoto = "PERFIL" WHERE m.idUsuario = 8',
        (err, listaMascotas) => {
            if (err) {
                console.log(err);
            }
            res.render('mascotas', { data: listaMascotas });
        })
};

mascota.add = (req, res) => {
    const data = Object.values(req.body);
    console.log(data);
    connection.query('INSERT INTO mascotas (idUsuario, NombreMascota, EspecieMascota,RazaMascota,AnioNacimientoMascota,AlimentoMascota,EnfermedadesMascota,VetNombreMascota,VetTelMascota,EstadoMascota) VALUES (8,?,?,?,?,?,?,?,?,"Activa")', data,
        (err, ins) => {
            if (err) {
                console.log(err);
            }
            console.log('insert de mascota completado');
        })

    connection.query('INSERT INTO fotos (RutaFoto, idUsuario, idMascota, EstadoFoto, DescripcionFoto) VALUES (?,?,(SELECT LAST_INSERT_ID() AS LII From masukotto.mascotas GROUP BY LAST_INSERT_ID()),1,"PERFIL")', [req.file.filename, '8'],
        (err, insf) => {
            if (err) {
                console.log(err);
            }
            console.log('Insert de Fotos completado');
        })


    //console.log(req.file.filename);
    res.redirect('petlist');
}

module.exports = mascota;