import {Markup} from "telegraf";
import {ReplyKeyboardMarkup} from "telegraf/src/core/types/typegram";

const sendContactKeyboard = (): Markup.Markup<ReplyKeyboardMarkup> => {
    return Markup.keyboard([[
            Markup.button.contactRequest("Отправить контакт")
        ]]
    )
}
export {sendContactKeyboard}