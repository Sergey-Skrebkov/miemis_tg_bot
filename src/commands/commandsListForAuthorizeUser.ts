import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {Command} from "./Command";
import {OrderCertificate} from "./OrderСertificate";

/**
 * Лист команд для авторизованныйх пользователей
 */
const commandsListForAuthorizeUser = (bot: Telegraf<CustomBotContext>): Command[] => {
    return [
        new OrderCertificate(bot)
    ]
}

export {commandsListForAuthorizeUser}