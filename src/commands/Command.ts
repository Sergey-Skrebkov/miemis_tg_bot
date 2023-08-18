import {Telegraf} from "telegraf";
import {CustomBotContext} from "CustomBotContext";

export abstract class Command {
    constructor(public bot: Telegraf<CustomBotContext>) {}

    abstract handle(): void;
}