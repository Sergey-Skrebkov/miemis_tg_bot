import {Command} from "./Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {StartCommand} from "./commands/StartCommand";
import {AcceptContactCommand} from "./commands/AcceptContactCommand";
import {IAmStudentAction} from "./actions/IAmStudentAction";
import {IAmNotStudentAction} from "./actions/IAmNotStudentAction";
/**
 * Лист обычных команд
 */
const commandsList = (bot: Telegraf<CustomBotContext>): Command[] => {
    return [
        new StartCommand(bot),
        new AcceptContactCommand(bot),
        new IAmStudentAction(bot),
        new IAmNotStudentAction(bot)
    ]
}

export {commandsList}
