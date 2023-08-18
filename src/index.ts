import dotenv from 'dotenv'
import {Bot} from "./Bot";
import {ConfigService} from "./config/ConfigService";
import {dbMiddleware} from "./middlewares/dbMiddlewares";
dotenv.config()


const bot = new Bot(new ConfigService())
bot.init()
bot.bot.use(dbMiddleware)

console.log("Запустил")