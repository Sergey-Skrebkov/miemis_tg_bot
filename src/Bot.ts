import {session, Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {IConfigService} from "./config/IConfigService";
import {Command} from "./commands/command";

export class Bot {
    bot: Telegraf<CustomBotContext>;
    commands: Command[] = [];
    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<CustomBotContext>(configService.getBotToken());
        this.bot.use(session());
    }

    init(): void {
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}