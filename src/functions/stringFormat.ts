/**
 * функция для форматирования строки заменяет <b>{0..}</b> на строку из массива
 * @param str строка для форматирования
 * @param args массив строк для замены
 * @return string отфармотированная строка
 */
const stringFormat = (str: string, args: string[]): string => {
    if (args.length) {
        for (let key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }
    return str;
}

export {stringFormat}