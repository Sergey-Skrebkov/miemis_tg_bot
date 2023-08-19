import {Context} from "telegraf";

async function handleException(ctx: Context, next: any) {
    try {
        await next()
    } catch (err: any) {
        console.log(err)
        if (err.errorMessage && !err.hideFromUser) {
            await ctx.reply(err.errorMessage)
        } else {
            await ctx.reply('Произошла неизвестная ошибка. Обратитесь в службу поддержки')
        }

    }
}

export {handleException}