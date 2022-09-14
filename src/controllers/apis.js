const { base64encode } = require("nodejs-base64");
const connection = require("../../database/dbConn");
const {promisify} = require("util")
const jwt = require("jsonwebtoken")

const controller = {};

controller.list = async (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, usuarios) => {
                if (err) {
                    res.json(err);
                }
                res.render('customers', {
                    data: usuarios
                });
            })
}

controller.register = (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        let passEncoded = base64encode(password);
        connection.query('INSERT INTO usuarios SET ?', 
        { 
            idUsuario: 4,
            idTipoUsuario: 1, 
            NombreUsuario: firstName, 
            ApellidoUsuario:lastName, 
            MailUsuario: email, 
            PassUsuario: passEncoded
        }, (error, result2) => {
            if (error) console.log(error);

            res.redirect("/")
        })
        
    } catch (error){
        console.log(error)
    }
    
  };
  
controller.login = (req, res) => {
    try {
        const userEmail = req.body.email;
        const password = req.body.password;
        let passEncoded = base64encode(password);

        if(!userEmail || !password){
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
                if(results.length == 0 || !(passEncoded !== results[0].PassUsuario)){
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
                    const token = jwt.sign({id: userId}, "secret");
                    console.log(`TOKEN: ${token} para el user: ${userEmail}`);

                    const cookiesOptions = {
                        expires: new Date(Date.now()+"90" * 24 * 60 * 60 * 1000),
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

    }   catch (error) {
        console.log(error);
    }
  };

controller.isAuthenticated = async (req, res, next) => {
    if(req.cookies.jwt) {
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

controller.logout = (req, res) => {
    res.clearCookie("jwt");
    return res.redirect("/")
}

module.exports = controller;