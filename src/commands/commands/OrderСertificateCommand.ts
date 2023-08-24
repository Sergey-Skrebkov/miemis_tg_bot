import {Command} from "../Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {numberOfCertificateInlineKeyboard} from "../telegramElements/numberOfCertificateInlineKeyboard";
import {CertificateService} from "../../service/certificate/CertificateService";
import {successInlineKeyboard} from "../telegramElements/successInlineKeyboard";

export class OrderCertificateCommand extends Command {

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.hears("Заказать справку об обучение", async (botCtx: CustomBotContext) => {
            await botCtx.reply(
                await botCtx.ctx.messageService.getMessage
                ('orderCertificate'),
                numberOfCertificateInlineKeyboard())
        })

        this.bot.action("one_certificate", async (botCtx: CustomBotContext) => {
            const service = new CertificateService(botCtx.ctx)
            await botCtx.reply(
                await service.infoForStudents(1),
                successInlineKeyboard('1')
            )
        })

        this.bot.action("two_certificate", async (botCtx: CustomBotContext) => {
            const service = new CertificateService(botCtx.ctx)
            await botCtx.reply(
                await service.infoForStudents(2),
                successInlineKeyboard('2')
            )
        })

        this.bot.action("three_certificate", async (botCtx: CustomBotContext) => {
            const service = new CertificateService(botCtx.ctx)
            await botCtx.reply(
                await service.infoForStudents(3),
                successInlineKeyboard('3')
            )
        })
    }

}