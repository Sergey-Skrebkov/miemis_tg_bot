export class ResponseError {
    // Сообщение об ошибке
    errorMessage: string
    // Признак, что вместо этой ошибки нужно отобразить "Произошла неизвестная ошибка. Обратитесь в службу поддержки."
    hideFromUser: boolean

    constructor(errorMessage: string, hideFromUser: boolean = false) {
        this.errorMessage = errorMessage
        this.hideFromUser = hideFromUser
    }
}

