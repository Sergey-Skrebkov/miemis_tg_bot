import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {sendContactKeyboard} from "../../telegramElements/sendContactKeyboard";

export class IAmStudentAction extends Command{

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.action("i_am_miemis_student", async (botCtx) =>{
            botCtx.reply("Круто😎 " +
                "Для аутентификации в сервисе мне нужен номер твоего телефона, " +
                "хранить его я не буду, " +
                "а только сверю с предоставленныйм " +
                "тобой при поступлении!",
                sendContactKeyboard().oneTime().resize())
        })
    }

}