import {PgClientFactory} from "../db/PgClientFactory";

export interface RequestContext{
    db?: PgClientFactory
}