import {PgClientFactory} from "../db/PgClientFactory";

export interface RequestContext{
    db?: PgClientFactory
    chatId?: number
    checkedChatId?: boolean
}