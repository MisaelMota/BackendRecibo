import { Router } from "express";
import { postRecibo,editarRecibo } from "../controllers/Recibo.controller";
import { loginUsuario, postUsuario,desloguearUsuario } from "../controllers/auth.controller";
const validation=require("../models/index")
const authController=require("../controllers/auth.controller")
const router=Router()


router.post('/reciboSave',validation.validate(validation.reciboModel),authController.usuarioAutenticado,postRecibo)
router.put('/editarRecibo:id_detalle',validation.validate(validation.reciboModel),authController.usuarioAutenticado,editarRecibo)

//rutas de autenticación
router.post ('/postUsuario',validation.validate(validation.usuarioNuevoModel),postUsuario)

router.post("/postLogin",validation.validate(validation.loginModel),loginUsuario)

router.get("/logout",desloguearUsuario)

export default router;



