const { base64encode, base64decode } = require("nodejs-base64");
const connection = require("../../database/dbConn");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const userSessionController = {};


userSessionController.login = (req, res) => {
    try {
        const userEmail = req.body.email;
        const password = req.body.password;
        let passEncoded = base64encode(password);

        if (!userEmail || !password) {
            res.render("inicioSesion", {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon: "info",
                showConfirmButton: true,
                timer: false,
                ruta: "inicioSesion"
            });
        } else {
            connection.query("SELECT * FROM usuarios WHERE MailUsuario = ?", [userEmail], (error, results) => {
                if (results.length == 0 || !(passEncoded !== results[0].PassUsuario)) {
                    res.render("inicioSesion", {
                        alert: true,
                        alertTitle: "Advertencia",
                        alertMessage: "Ingrese un usuario y contraseña",
                        alertIcon: "info",
                        showConfirmButton: true,
                        timer: false,
                        ruta: "inicioSesion"
                    });
                } else {
                    const userId = results[0].idUsuario;
                    const token = jwt.sign({ id: userId }, "secret");
                    req.session.loggedin = true;
                    req.session.userId = userId;
                    req.session.typeUser = results[0].idTipoUsuario
                    console.log(req)
                    const cookiesOptions = {
                        expires: new Date(Date.now() + "90" * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie("jwt", token, cookiesOptions);
                    res.render("inicioSesion", {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡Login correcto!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ""
                    })
                }
            })
        }

    } catch (error) {
        console.log(error);
    }
};

userSessionController.logout = (req, res) => {
    res.clearCookie("jwt");
    res.render("inicioSesion", {
        alert: true,
        alertTitle: "Éxito",
        alertMessage: "¡Se ha desconectado exitosamente!",
        alertIcon: "success",
        showConfirmButton: false,
        timer: 1000,
        ruta: "inicioSesion"
    });
}

userSessionController.forget = (req, res) => {
    try {
        const userEmail = req.body.recuperaremail;
        connection.query("SELECT * FROM usuarios WHERE MailUsuario = ?", [userEmail], (error, results) => {
            if (results.length === 0) {
                console.log("Error en la query recuperar password")
                res.render("recuperarPassword", {
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Email incorrecto",
                    alertIcon: "info",
                    showConfirmButton: false,
                    timer: 800,
                    ruta: "recuperarPassword"
                });
            } else {
                const encodedPass = results[0].PassUsuario;
                const decodedPass = base64decode(encodedPass);
                res.render("recuperarPassword", {
                    alert: true,
                    alertTitle: "Email correcto",
                    alertMessage: `Tu password es: ${decodedPass}`,
                    alertIcon: "success",
                    showConfirmButton: true,
                    timer: false,
                    ruta: "inicioSesion"
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

userSessionController.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, "secret");
            connection.query("SELECT * FROM usuarios WHERE idUsuario = ?", [decoded.idUsuario], (error, results) => {
                if (!results) next();
                req.userEmail = results[0];
                return next();
            })
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        res.redirect("/inicioSesion");
    }
}

module.exports = userSessionController;