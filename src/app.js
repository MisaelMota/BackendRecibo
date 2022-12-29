import express from "express"
import config from "./config"
import Reciboroutes from "./routes/Recibo.routes"

const app = express();
const cookieParser = require("cookie-parser")
//cors
var cors = require("cors")
app.use(cors())

//settings
app.set('port', config.port)

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(Reciboroutes)

export default app;









