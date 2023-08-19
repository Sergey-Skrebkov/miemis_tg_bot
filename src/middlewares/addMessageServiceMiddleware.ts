import {CustomBotContext} from "CustomBotContext"
import {MessageService} from "../service/message/MessageService";

/**
 * Добавляет сервис для получения сообщений из БД
 */
async function addMessageServiceMiddleware(botCtx: CustomBotContext, next: () => Promise<void>){
    botCtx.ctx.messageService = new MessageService(botCtx.ctx)
    await next()
}

export {addMessageServiceMiddleware}