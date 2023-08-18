import {session, Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {IConfigService} from "./config/IConfigService";
import {Command} from "./commands/Command";
import {dbMiddleware} from "./middlewares/dbMiddlewares";
import {commandsList} from "./commands/commandsList";
import {handleExceptions} from "./middlewares/handleExceptions";

export class Bot {
    bot: Telegraf<CustomBotContext>;
    commands: Command[];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<CustomBotContext>(configService.getBotToken());
        this.bot.use(session());
        this.bot.use(dbMiddleware) //Ложим БД в контекст бота
        this.bot.use(handleExceptions) //миделфэйр для обработки ошибок что-бы бот не дох когда что-то ловит
        this.commands = commandsList(this.bot); //Лист команд импортируемый из функций
    }

    init(): void {
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}