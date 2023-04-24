import { Router } from "express";
import { postRecibo, editarRecibo, listarRecibo, obtenerInquilinosPorUsuario, obtenerDireccionCasa, obtenerReciboPorId } from "../controllers/Recibo.controller";
import { loginUsuario, postUsuario, desloguearUsuario, usuarioPorId } from "../controllers/auth.controller";
const validation = require("../models/index")
const authController = require("../controllers/auth.controller")
const router = Router()


router.post('/reciboSave', validation.validate(validation.reciboModel), authController.usuarioAutenticado, postRecibo)
router.put('/editarRecibo:id_detalle', validation.validate(validation.reciboModel), authController.usuarioAutenticado, editarRecibo)

//rutas de autenticación
router.post('/postUsuario', validation.validate(validation.usuarioNuevoModel), postUsuario)

router.post("/postLogin", validation.validate(validation.loginModel), loginUsuario)

router.post("/listarInquilinos", validation.validate(validation.ListarInquilinoModel), obtenerInquilinosPorUsuario)

router.post("/listarDirecciones", validation.validate(validation.ListarDireccionesModel), obtenerDireccionCasa)

router.post("/listarRecibo", listarRecibo)

router.post("/usuarioPorId", usuarioPorId)

router.post("/reciboPorId:id_detalle", obtenerReciboPorId)

router.get("/logout", desloguearUsuario)



export default router;



