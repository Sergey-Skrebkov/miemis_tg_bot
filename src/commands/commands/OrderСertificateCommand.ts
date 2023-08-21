import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {numberOfCertificateInlineKeyboard} from "../../telegramElements/numberOfCertificateInlineKeyboard";
import {CertificateService} from "../../service/certificate/CertificateService";

export class OrderCertificateCommand extends Command {

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.hears("Заказать справку об обучение", async (botCtx: CustomBotContext) => {
            botCtx.reply(
                await botCtx.ctx.messageService.getMessage
                ('orderCertificate'),
                numberOfCertificateInlineKeyboard())
        })

        this.bot.action("one_certificate", async (botCtx: CustomBotContext) => {
            const service = new CertificateService(botCtx.ctx)
            botCtx.reply("Заглушка")
        })

        this.bot.action("two_certificate", async (botCtx: CustomBotContext) => {
            botCtx.reply("Галошка")
        })

        this.bot.action("three_certificate", async (botCtx: CustomBotContext) => {
            botCtx.reply("Картошка")
        })
    }

}