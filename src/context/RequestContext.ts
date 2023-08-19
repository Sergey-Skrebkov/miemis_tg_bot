import {PgClientFactory} from "../db/PgClientFactory";
import {MessageService} from "../service/message/MessageService";

export interface RequestContext{
    db?: PgClientFactory
    chatId?: number
    checkedChatId?: boolean
    messageService?: MessageService
}