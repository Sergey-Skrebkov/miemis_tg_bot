import {CustomBotContext} from "CustomBotContext";
import {ResponseError} from "../exceptions/ResponseError";

/**
 * Закрывает доступ не авторизованным чатам
 */
async function rightMiddleware(botCtx: CustomBotContext, next: () => Promise<void>) {
    if(!botCtx.ctx.checkedChatId){
        throw new ResponseError("Данная команда не доступна!!!")
    }
    await next()
}

export {rightMiddleware}