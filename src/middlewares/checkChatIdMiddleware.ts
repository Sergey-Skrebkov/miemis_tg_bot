import {CustomBotContext} from "CustomBotContext";
import {StudentDao} from "../service/student/StudentDao";

/**
 * мидлевейр проверяет есть ли чат в БД
 * вносит в контекст информацию о чат ид
 */
async function checkChatIdMiddleware(botCtx: CustomBotContext, next: () => Promise<void>) {
    const studentDao = new StudentDao(botCtx.ctx)
    const chatId = botCtx.chat.id
    const checkedChatId = await studentDao.checkChatId(chatId)
    botCtx.ctx.chatId = chatId
    botCtx.ctx.checkedChatId = checkedChatId
    await next()
}

export {checkChatIdMiddleware}