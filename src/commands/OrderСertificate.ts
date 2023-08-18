import {Command} from "./Command";
import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";
import {CertificateService} from "../service/certificate/CertificateService";

export class OrderCertificate extends Command{

    constructor(bot: Telegraf<CustomBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("order_sertifikate", async (botCtx) =>{
            const service = new CertificateService()
            botCtx.reply(await service.addCertificateTaskToBitrix())
        })
    }

}