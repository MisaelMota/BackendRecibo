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
            .execute(procedures.NuevoReciboRecibos,(error,result)=>{
                res.json(result.recordset[0])
            })
        // res.json({ suma_de, concepto_de, fecha, id_casa, recibi_de, id_usuario })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const editarRecibo = async (req, res) => {

    const { suma_de, concepto_de, fecha, id_casa, recibi_de, id_usuario } = req.body

    try {
        const pool = await getConnection();
        await pool.request()
            .input("suma_de", sql.Decimal, suma_de)
            .input("concepto_de", sql.VarChar, concepto_de)
            .input("fecha", sql.DateTime, fecha)
            .input("id_casa", sql.Int, id_casa)
            .input("recibi_de", sql.Int, recibi_de)
            .input("id_detalle", sql.Int, id_usuario)
            .execute(procedures.editarRecibo,(error,result)=>{
                res.json(result.recordset[0])
            })
        // res.json({ suma_de, concepto_de, fecha, id_casa, recibi_de, id_usuario })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}


export const listarRecibo = async (req, res) => {
    const id_usuario=req.body

    try {
        const pool=await getConnection();
        await pool.request()
        .input("id_usuario",sql.Int,id_usuario)
        .execute(procedures.listarRecibo,(error,result)=>{
            res.json(result.recordset[0])
        })
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}

export const obtenerReciboPorId = async (req, res) => {
    const id_detalle=req.body

    try {
        const pool=await getConnection();
        await pool.request()
        .input("id_detalle",sql.Int,id_detalle)
        .execute(procedures.listarRecibo,(error,result)=>{
            res.json(result.recordset[0])
        })
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

}




