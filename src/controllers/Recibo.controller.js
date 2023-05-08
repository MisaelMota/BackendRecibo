import { getConnection, sql, procedures } from "../database";


export const postRecibo = async (req, res) => {

    const { suma_de, concepto_de, fecha, id_casa, recibi_de, id_usuario } = req.body

    try {
        const pool = await getConnection();
        await pool.request()
            .input("suma_de", sql.Decimal, suma_de)
            .input("concepto_de", sql.VarChar, concepto_de)
            .input("fecha", sql.DateTime, fecha)
            .input("id_casa", sql.Int, id_casa)
            .input("recibi_de", sql.Int, recibi_de)
            .input("id_usuario", sql.Int, id_usuario)
            .execute(procedures.NuevoReciboRecibos, (error, result) => {
                res.json(result.recordsets)
            })

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const editarRecibo = async (req, res) => {

    const { suma_de, concepto_de, fecha, id_casa, recibi_de } = req.body
    const id_cheque = req.params.id_cheque

    try {
        const pool = await getConnection();
        await pool.request()
            .input("suma_de", sql.Decimal, suma_de)
            .input("concepto_de", sql.VarChar, concepto_de)
            .input("fecha", sql.DateTime, fecha)
            .input("id_casa", sql.Int, id_casa)
            .input("recibi_de", sql.Int, recibi_de)
            .input("id_cheque", sql.Int, id_cheque)
            .execute(procedures.editarRecibo, (error, result) => {
                res.json(result)
                console.log(id_cheque)
            })
      
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}


export const listarRecibo = async (req, res) => {
    const id_usuario = req.body.id_usuario

    try {
        const pool = await getConnection();
        pool.request()
            .input("id_usuario", sql.Int, id_usuario)
            .execute(procedures.listarRecibo, (error, result) => {
                if (error) {
                    res.json("ha ocurrido un error")
                }
                else {
                    res.json(result.recordset)
                }

            })

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const obtenerReciboPorId = async (req, res) => {
    const id_cheque = req.params.id_cheque

    try {
        const pool = await getConnection();
        await pool.request()
            .input("id_cheque", sql.Int, id_cheque)
            .execute(procedures.obtenerReciboPorId, (error, result) => {
                if (error) {
                    res.json("ha ocurrido un error")
                }
                else {
                    res.json(result.recordset)
                }
            })

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const obtenerInquilinosPorUsuario = async (req, res) => {
    const usuario_rb = req.body.usuario_rb
    try {
        const pool = await getConnection();
        pool.request()
            .input("usuario_rb", sql.Int, usuario_rb)
            .execute(procedures.obtenerInquilinosPorUsuario, (error, result) => {
                if (error) {
                    res.json("ha ocurrido un error")
                }
                else {
                    res.json(result.recordset)
                }
            })

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const obtenerDireccionCasa = async (req, res) => {
    const usuario_rb = req.body.usuario_rb
    try {
        const pool = await getConnection();
        pool.request()
            .input("usuario_rb", sql.Int, usuario_rb)
            .execute(procedures.obtenerDireccionCasa, (error, result) => {
                if (error) {
                    res.json("ha ocurrido un error")
                }
                else {
                    res.json(result.recordset)
                }
            })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}




