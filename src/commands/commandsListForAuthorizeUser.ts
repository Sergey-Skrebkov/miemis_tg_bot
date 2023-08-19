import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {Command} from "./Command";
import {OrderCertificateCommand} from "./commands/OrderСertificateCommand";

/**
 * Лист команд для авторизованныйх пользователей
 */
const commandsListForAuthorizeUser = (bot: Telegraf<CustomBotContext>): Command[] => {
    return [
        new OrderCertificateCommand(bot)
    ]
}

export {commandsListForAuthorizeUser}