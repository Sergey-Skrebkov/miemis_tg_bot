import {Markup} from "telegraf";
import {InlineKeyboardMarkup} from "telegraf/src/core/types/typegram";

const numberOfCertificateInlineKeyboard = (): Markup.Markup<InlineKeyboardMarkup> => {
    return Markup.inlineKeyboard([
        Markup.button.callback('1️⃣', 'one_certificate'),
        Markup.button.callback('2️⃣', 'two_certificate'),
        Markup.button.callback('3️⃣', 'three_certificate')
    ])
}

export {numberOfCertificateInlineKeyboard}