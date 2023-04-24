import { config } from "dotenv";

config();

export default{
    port: process.env.port ||4000,
    dbUser:process.env.DB_USER|| "",
    dbPassword:process.env.DB_PASSWORD|| "",
    dbServer:process.env.DB_SERVER|| "",
    dbDatabase:process.env.DB_DATABASE|| "",
    jwt_secret:process.env.JWT_SECRET,
    jwt_time_expires:process.env.JWT_TIME_EXPIRES,
    jwt_cookie_expires:process.env.JWT_COOKIE_EXPIRES,
    jwt_name:process.env.JWT_NAME

}
