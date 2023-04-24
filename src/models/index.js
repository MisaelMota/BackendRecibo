const yup = require('yup')

export function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
}



export function reciboModel(data) {
    const shema = yup.object().shape({

        recibi_de: yup.number("This field is a number")
            .min(1)
            .integer()
            .required("this field recibi is required"),

        suma_de: yup.number("this field is a number")
            .min(1)
            .required("this field suma_de is required"),

        concepto_de: yup.string("this field is a string")
            .min(1, "this field must be a 5 min character")
            .max(100, "this field must be a 100 max character")
            .required("this field concepto_de is required"),

        id_casa: yup.number("this field is a number")
            .min(1)
            .integer()
            .required("this field id_casa is required"),

        fecha: yup.date("this field is a date")
            .required("this field fecha is required"),

        id_usuario: yup.number("this field is a number")
            .min(1)
            .integer()
            .required("this field recibi is required"),

    });

    shema.validateSync(data)
}

export function usuarioNuevoModel(data) {
    const shema = yup.object().shape({

        correo_usuario: yup.string("this field is a string")
            .min(1, "this field must be a 5 min character")
            .max(100, "this field must be a 100 max character")
            .email({ RegExp: /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/ })
            .required("this field is required"),



        contrasena: yup.string("this field is a string")
            .min(1, "this field must be a 5 min character")
            .max(50, "this field must be a 100 max character")
            .required("this field is required"),

        nombre_completo: yup.string("this field is a string")
            .min(1, "this field must be a 5 min character")
            .max(50, "this field must be a 100 max character")
            .required("this field is required"),

    });

    shema.validateSync(data)
}

export function loginModel(data) {
    const shema = yup.object().shape({

        correo_usuario: yup.string("this field is a string")
            .required("this field is required"),

        contrasena: yup.string("this field is a string")
            .min(8, "this field must be a 8 min character")
            .max(56, "this character must be a 56 min character")
            .required("this field is required"),

    });

    shema.validateSync(data)
}

export function ListarInquilinoModel(data) {
    const shema = yup.object().shape({

        usuario_rb: yup.number("this field is a Number")
            .required("this field is required")

    });

    shema.validateSync(data)
}

export function ListarDireccionesModel(data) {
    const shema = yup.object().shape({

        usuario_rb: yup.number("this field is a Number")
            .required("this field is required")

    });

    shema.validateSync(data)
}







