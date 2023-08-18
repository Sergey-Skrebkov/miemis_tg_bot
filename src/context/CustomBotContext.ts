import {Context} from "telegraf";
import {RequestContext} from "RequestContext";

export interface CustomBotContext extends Context {
    ctx: RequestContext
}