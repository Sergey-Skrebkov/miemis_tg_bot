import {Markup} from "telegraf";
import {InlineKeyboardMarkup} from "telegraf/src/core/types/typegram";

const startInlineKeyboard = (): Markup.Markup<InlineKeyboardMarkup> => {
    return Markup.inlineKeyboard([
        Markup.button.callback("Да, я студент МИЭМИС", "i_am_miemis_student"),
        Markup.button.callback("Нет, я не студент МИЭМИС", "i_am_not_miemis_student"),
    ])
}

export {startInlineKeyboard}