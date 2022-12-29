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
        await pool.request()
            .input("correo_usuario", sql.VarChar, correo_usuario)
            .execute(procedures.loginUsuario, (err, result) => {
                if (!(bcryptjs.compareSync(contrasena, result.recordset[0].contrasena))) {
                    res.json("Correo o Contraseña incorrectos, escriba nuevamente sus credenciales")
                }
                else {

                    const id = result.recordset[0].id_usuario
                    // console.log(id)
                    const token = jwt.sign({ id: id }, config.jwt_secret, {
                        expiresIn: config.jwt_time_expires,

                    })

                    const cookiesOption = {
                        expires: new Date(Date.now() + config.jwt_cookie_expires * 3600000),
                        httpOnly: true
                    }

                    res.cookie("jwt", token, cookiesOption)
                    // res.json("login satisfactorio")
                    res.json(token)
                    console.log(token)
                    
                }
            })


    } catch (error) {
        res.send(error.message)
    }

}


export const usuarioAutenticado = async (req, res, next) => {

    if (req.cookies.jtw) {
        try {
            const decodificado = await promisify(jwt.verify)(req.cookies.jwt, config.jwt_secret)
            // console.log(decodificado)
            const pool = await getConnection();
            await pool.request()
                .input("id_usuario", sql.Int, decodificado.id)
                .execute(procedures.usuarioPorId, (err, result) => {
                    if (!result) {
                        return next()
                    }
                    req.usuario = result.recordset[0]
                    // res.json(req.usuario)
                    console.log(req.usuario)
                    return next()
                })
        } catch (error) {
            res.json(error)
            // return next()
        }
    } else (
        res.json("no estas logueado")
        
    )

}

export const actualizarContrasena = async(req, res) => {
    const id_usuario = req.body.id_usuario;
    const contrasena = await bcryptjs.hash(req.body.contrasena, 8)
    try {
        const pool = await getConnection();
        await pool.request()
        .input("id_usuario",sql.Int,id_usuario)
        .input("contrasena",sql.VarChar,contrasena)
        .execute(procedures.ActualizarContrasena,(err,result)=>{
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

export const desloguearUsuario = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.json("deslogueado")
    } catch (error) {
        res.json(error)
    }
}







