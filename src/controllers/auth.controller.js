import { pool } from "mssql";
import config from "../config";
import { getConnection, sql, procedures } from "../database";
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const { promisify } = require("util")



export const postUsuario = async (req, res) => {
    // let contrasena
    const correo_usuario = req.body.correo_usuario
    const contrasena = await bcryptjs.hash(req.body.contrasena, 8)
    // const contrasenaPlana=req.body.contrasena
    const nombre_completo = req.body.nombre_completo

    try {
        const pool = await getConnection();
        await pool.request()
            .input("correo_usuario", sql.VarChar, correo_usuario)
            .input("contrasena", sql.VarChar, contrasena)
            .input("nombre_completo", sql.VarChar, nombre_completo)
            .execute(procedures.registroUsuario, (err, result) => {

                if (result) {
                    res.json(result)
                }
                else {
                    res.json(err)
                }

            })

    } catch (error) {
        res.status(500)
        res.send(error.message)

    }

}

export const loginUsuario = async (req, res) => {
    const correo_usuario = req.body.correo_usuario
    const contrasena = req.body.contrasena
    try {
        const pool = await getConnection();
        pool.request()
            .input("correo_usuario", sql.VarChar, correo_usuario)
            .execute(procedures.loginUsuario, (err, result) => {
                if (!result.recordsets[0].length) {
                    res.json("error, no se estan llegando resultados de la base datos, es probable que el correo ingresado este incorrecto");
                }
                else if (!(bcryptjs.compareSync(contrasena, result.recordset[0].contrasena))) {
                    res.json("Correo o Contraseña incorrectos, escriba nuevamente sus credenciales");
                }
                else {
                    console.log(result.recordsets)
                    const id = result.recordset[0].id_usuario;
                    // console.log(id)
                    const token = jwt.sign({ id: id }, config.jwt_secret, {
                        expiresIn: config.jwt_time_expires,
                    });

                    res.json({ jtName: config.jwt_name, userAcss: token })
                    console.log(token)



                }
            })


    } catch (error) {
        res.json(error.message)
    }
}


export const usuarioAutenticado = async (req, res, next) => {

    const token = req.headers['x-access-token'] || req.query.token;
    console.log(token)
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.id_usuario = decoded.id;
        next();
    });


}

export const actualizarContrasena = async (req, res) => {
    const id_usuario = req.body.id_usuario;
    const contrasena = await bcryptjs.hash(req.body.contrasena, 8)
    try {
        const pool = await getConnection();
        await pool.request()
            .input("id_usuario", sql.Int, id_usuario)
            .input("contrasena", sql.VarChar, contrasena)
            .execute(procedures.ActualizarContrasena, (err, result) => {
                if (result) {
                    res.json(result)
                }
                else {
                    res.json(err)
                }
            })


    } catch (error) {
        res.json(error)
    }
}

export const usuarioPorId = async (req, res) => {
    const id_usuario = req.body.id_usuario;
    try {
        const pool = await getConnection();
        await pool.request()
            .input("id_usuario", sql.Int, id_usuario)
            .execute(procedures.usuarioPorId, (err, result) => {
                if (result) {
                    res.json(result.recordset)
                }
                else {
                    res.json(err)
                }
            })


    } catch (error) {
        res.json(error)
    }
}

export const desloguearUsuario = async (req, res) => {
    try {
        console.log(req.cookies.jwt)
        res.clearCookie("jwt")
        // localStorage.removeItem("jwt")
        res.json("deslogueado")
        console.log("deslogueado")
    } catch (error) {
        res.json(error)
    }
}


// console.log(req.userAcss)
// if (req.userAcss) {
//     try {
//         const decodificado = await promisify(jwt.verify)(req.userAcss, config.jwt_secret)
//         // console.log(decodificado)
//         const pool = await getConnection();
//         pool.request()
//             .input("id_usuario", sql.Int, decodificado.id)
//             .execute(procedures.usuarioPorId, (err, result) => {
//                 if (!result) {
//                     return next();
//                 }
//                 req.usuario = result.recordset[0];
//                 res.json(req.usuario)
//                 console.log(req.usuario);
//                 return next();
//             })
//     } catch (error) {
//         res.json(error)
//
//     }
// } else (
//     res.json("no estas logueado")

// )




