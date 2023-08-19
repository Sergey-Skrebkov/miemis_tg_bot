import {Markup} from "telegraf";
import {ReplyKeyboardMarkup} from "telegraf/src/core/types/typegram";

const startKeyboardForAuthChat = (): Markup.Markup<ReplyKeyboardMarkup> => {
    return Markup.keyboard([
        ['Заказать справку об обучение']
        ]
    )
}

export {startKeyboardForAuthChat}