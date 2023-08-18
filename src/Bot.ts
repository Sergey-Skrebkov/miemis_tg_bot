import {session, Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {IConfigService} from "./config/IConfigService";
import {Command} from "./commands/Command";
import {dbMiddleware} from "./middlewares/dbMiddlewares";
import {commandsList} from "./commands/commandsList";

export class Bot {
    bot: Telegraf<CustomBotContext>;
    commands: Command[] = [];
    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<CustomBotContext>(configService.getBotToken());
        this.bot.use(session());
        this.bot.use(dbMiddleware);
        this.commands = commandsList(this.bot);
    }

    init(): void {
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}