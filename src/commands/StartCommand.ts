import {Command} from "./Command";
import {Telegraf, Markup} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {StudentService} from "../service/student/StudentService";

export class StartCommand extends Command {
    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start(async (botCtx) => {
            console.log(botCtx.chat.id)
            botCtx.reply("Привет",
                Markup.keyboard([[
                        Markup.button.contactRequest("Отправить контакт")
                    ]]
                ))
        })

        this.bot.on("contact", async (botCtx) => {
            const contact = botCtx.message.contact;
            const phoneNumber = contact.phone_number;
            const service = new StudentService(botCtx.ctx)
            botCtx.reply(await service.getAuthenticateMessage(phoneNumber))
        })
    }


}