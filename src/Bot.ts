import {session, Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {IConfigService} from "./config/IConfigService";
import {Command} from "./commands/Command";
import {dbMiddleware} from "./middlewares/dbMiddlewares";
import {commandsList} from "./commands/commandsList";
import {handleException} from "./middlewares/handleException";
import {checkChatIdMiddleware} from "./middlewares/checkChatIdMiddleware";
import {rightMiddleware} from "./middlewares/rightMiddleware";
import {logMiddleware} from "./middlewares/logMiddleware";

/**
 * Класс для инициализации телеграм бота
 */
export class Bot {
    bot: Telegraf<CustomBotContext>;
    commands: Command[];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<CustomBotContext>(configService.getBotToken());
        this.bot.use(session());
        this.bot.use(dbMiddleware) //Ложим БД в контекст бота
        this.bot.use(handleException) //миделфэйр для обработки ошибок что-бы бот не дох когда что-то ловит
        this.bot.use(checkChatIdMiddleware)
        this.bot.use(logMiddleware)
        this.commands = commandsList(this.bot); //Лист команд импортируемый из функций
    }

    /**
     * инициализация команд бота
     */
    init(): void {
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.use(rightMiddleware)
        this.bot.launch();
    }
}