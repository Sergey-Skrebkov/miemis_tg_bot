import dotenv from 'dotenv'
dotenv.config()

import {Bot} from "./Bot";
import {ConfigService} from "./config/ConfigService";



const bot = new Bot(new ConfigService())
bot.init()
console.log("Запустил")