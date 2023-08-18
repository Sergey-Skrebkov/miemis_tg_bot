import {Command} from "./Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {StartCommand} from "./StartCommand";
import {OrderCertificate} from "./OrderСertificate";

const commandsList = (bot: Telegraf<CustomBotContext>): Command[] => {
    return [
        new StartCommand(bot),
        new OrderCertificate(bot)
    ]
}

export {commandsList}
