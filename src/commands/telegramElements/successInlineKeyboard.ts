import {Markup} from "telegraf";
import {InlineKeyboardMarkup} from "telegraf/src/core/types/typegram";

const successInlineKeyboard = (orderNumber: string) : Markup.Markup<InlineKeyboardMarkup> =>{
    return Markup.inlineKeyboard([
        Markup.button.callback("Да", "yes_order_" + orderNumber),
        Markup.button.callback("Нет", "no"),
    ])
}

export {successInlineKeyboard}