const mascota = {};
const connection = require("../../database/dbConn");

mascota.list = (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    connection.query('SELECT f.RutaFoto, f.DescripcionFoto, m.idMascota, m.idUsuario, m.NombreMascota, m.EspecieMascota, m.RazaMascota, m.AnioNacimientoMascota, m.AlimentoMascota, m.EnfermedadesMascota, m.VetNombreMascota, m.EstadoMascota FROM masukotto.mascotas m LEFT JOIN masukotto.fotos f ON m.idMascota = f.idMascota AND EstadoFoto = 1 AND DescripcionFoto = "PERFIL" WHERE m.idUsuario = ? AND EstadoMascota = "Activa"', [id],
        (err, listaMascotas) => {
            if (err) {
                console.log(err);
            }
            res.render('mascotas', { session: req.session, data: listaMascotas });
        })
};

mascota.add = (req, res) => {
    const { id } = req.params;
    const data = Object.values(req.body);
    console.log(data);
    connection.query(`INSERT INTO mascotas (idUsuario, NombreMascota, EspecieMascota,RazaMascota,AnioNacimientoMascota,AlimentoMascota,EnfermedadesMascota,VetNombreMascota,VetTelMascota,EstadoMascota) VALUES (?,?,'Activa')`, [id, data],
        (err, ins) => {
            if (err) {
                console.log(err);
            }
            console.log('insert de mascota completado');
        })

    connection.query('INSERT INTO fotos (RutaFoto, idUsuario, idMascota, EstadoFoto, DescripcionFoto) VALUES (?,?,(SELECT LAST_INSERT_ID() AS LII From masukotto.mascotas GROUP BY LAST_INSERT_ID()),1,"PERFIL")', [req.file.filename, id],
        (err, insf) => {
            if (err) {
                console.log(err);
            }
            console.log('Insert de Fotos completado');
        })
    res.redirect(req.get('referer'));

    //console.log(req.file.filename);

}

mascota.update = (req, res) => {
    const { id } = req.params;
    const updpet = req.body;
    console.log(updpet)
    connection.query('UPDATE masukotto.mascotas SET NombreMascota = ?, AlimentoMascota = ?, EnfermedadesMascota, VetNombreMascota WHERE m.idMascota = ?', [updpet, id],
        (err, updatapet) => {
            if (err) {
                console.log(err);
            }
            console.log('Update de datos OK');
        })
    connection.query('UPDATE masukotto.fotos SET RutaFoto = ?  WHERE idFoto = ?', [updpet, id],
            (err, updphpet) => {
                if (err) {
                    console.log(err);
                }
                console.log('Update de Foto OK');
            })
        //res.redirect(req.get('referer'));

    //console.log(req.file.filename);

}

mascota.delete = (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    connection.query('UPDATE masukotto.mascotas SET EstadoMascota = "Inactiva" WHERE idMascota = ?', [id],
        (err, delpet) => {
            if (err) {
                console.log(err);
            }
            console.log('Mascota dada de baja');
        })
    res.redirect(req.get('referer'));

    //console.log(req.file.filename);

};
module.exports = mascota;