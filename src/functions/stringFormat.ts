const stringFormat = (str: string, arguments: string[]): string => {
    if (arguments.length) {
        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }
    return str;
}