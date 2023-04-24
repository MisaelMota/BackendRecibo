import express from "express"
import config from "./config"
import Reciboroutes from "./routes/Recibo.routes"
const cookieParser = require("cookie-parser")

const app = express();

//cors
var cors = require("cors")
app.use(cors({origin:true,credentials:true}))

//settings
app.set('port', config.port)

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(cookieParser())

app.use(Reciboroutes)



export default app;









