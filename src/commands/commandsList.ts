import {Command} from "./Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {StartCommand} from "./StartCommand";

const commandsList = (bot: Telegraf<CustomBotContext>): Command[] => {
    return [
        new StartCommand(bot)
    ]
}

export {commandsList}
