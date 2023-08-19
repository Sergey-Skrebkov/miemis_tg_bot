import {CustomBotContext} from "CustomBotContext";
import moment from "moment";

/**
 * Логирование входящих сообщений
 */
async function logMiddleware(botCtx: CustomBotContext, next: () => Promise<void>) {
    const logMessage = `${moment()} Пришло сообщение в чат ${botCtx.ctx.chatId}`
    console.log(logMessage)
    await next()
}

export {logMiddleware}