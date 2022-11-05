const guarderia = {};
const connection = require("../../database/dbConn");

guarderia.list = (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    connection.query('SELECT f.RutaFoto, f.DescripcionFoto, g.idGuarderia, g.idUsuario, g.NombreGuarderia, g.TelGuarderia, g.ProvinciaGuarderia, g.LocalidadGuarderia, g.CPGuarderia, g.DomCalleGuarderia, g.DomNumeroGuarderia, g.DomPisoDptoGuarderia, g.TipoGuarderia, g.MailGuarderia, g.DescripcionGuarderia, g.CalificacionGuarderia, g.MascEspecieGuarderia, g.LugaresGuarderia, g.MascTalleGuarderia, g.EstadoGuarderia , g.LugaresGuarderia - (SELECT COUNT(*) FROM masukotto.reservas r WHERE FechaDesdeReserva > curdate() AND FechaHastaReserva < curdate() AND ConfirmaReserva = 1 AND idGuarderia = g.idGuarderia) AS LugaresDisponibles FROM masukotto.guarderias g LEFT JOIN masukotto.fotos f ON g.idGuarderia = f.idGuarderia AND EstadoFoto = 1 AND DescripcionFoto = "PERFIL" WHERE g.idUsuario = ? AND EstadoGuarderia = "Activa"', [id],
        (err, listaGuarderiasUser) => {
            if (err) {
                console.log(err);
            }
            res.render('guarderias', { session: req.session, data: listaGuarderiasUser });
        })
};

guarderia.add = (req, res) => {
    const { id } = req.params;
    const data = Object.values(req.body);
    console.log(data);
    connection.query(`INSERT INTO guarderias (idUsuario, NombreGuarderia, MascEspecieGuarderia, TipoGuarderia, MascTalleGuarderia, LugaresGuarderia, DescripcionGuarderia, DomCalleGuarderia, DomNumeroGuarderia,DomPisoDptoGuarderia,LocalidadGuarderia,ProvinciaGuarderia,CPGuarderia,TelGuarderia,EstadoGuarderia) VALUES (?,?,'Pendiente')`, [id, data],
        (err, insg) => {
            if (err) {
                console.log(err);
            }
            console.log('insert de guarderias completado');
        })

    connection.query('INSERT INTO fotos (RutaFoto, idUsuario, idGuarderia, EstadoFoto, DescripcionFoto) VALUES (?,?,(SELECT LAST_INSERT_ID() AS LII From masukotto.guarderias GROUP BY LAST_INSERT_ID()),1,"PERFIL")', [req.file.filename, id],
        (err, insf) => {
            if (err) {
                console.log(err);
            }
            console.log('Insert de Fotos completado');
        })
    res.redirect(req.get('referer'));

    //console.log(req.file.filename);

}

guarderia.update = (req, res) => {
    const { id } = req.params;
    const updpet = req.body;
    console.log(updpet)
    connection.query('UPDATE masukotto.guarderias SET ? WHERE idGuarderia = ?', [updpet, id],
            (err, updatacare) => {
                if (err) {
                    console.log(err);
                }
                console.log('Update de datos OK');
            })
        /*     connection.query('UPDATE masukotto.fotos SET RutaFoto = ?  WHERE idFoto = ?', [updpet, id],
                    (err, updphpet) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Update de Foto OK');
                    }) */
    res.redirect(req.get('referer'));

    //console.log(req.file.filename);

}

guarderia.delete = (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    connection.query('UPDATE masukotto.guarderias SET EstadoGuarderia = "Inactiva" WHERE idMascota = ?', [id],
        (err, delcare) => {
            if (err) {
                console.log(err);
            }
            console.log('Mascota dada de baja');
        })
    res.redirect(req.get('referer'));

    //console.log(req.file.filename);

};
module.exports = guarderia;