import {PgClientFactory} from "../db/PgClientFactory";
import {RequestContext} from "RequestContext";

async function dbMiddleware(botCtx: any, next: () => Promise<void>) {
    const ctx: RequestContext = {
        db: new PgClientFactory(),
    }
    botCtx.ctx = ctx
    try {
        await next()
        await ctx.db.commit()
    } catch (err) {
        await ctx.db.rollback()
        throw err
    }
}

export {dbMiddleware}