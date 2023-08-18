import {ClientConfig, PoolClient, PoolConfig, types, Pool} from 'pg'
import {PgClient} from './PgClient'

types.setTypeParser(1082, 'text', function (val) {
  return val?.substring(0, 10)
})

types.setTypeParser(1700, function (val) {
  return parseFloat(val)
})

types.setTypeParser(20, function (val) {
  return parseInt(val)
})

const {PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_STATEMENT_TIMEOUT} = process.env

const ERROR_TOO_MANY_ROWS = 'Single row query returns too many rows'

const DEFAULT_CONFIG: PoolConfig = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: parseInt(PG_PORT),
  statement_timeout: parseInt(PG_STATEMENT_TIMEOUT) || 10000,
  idleTimeoutMillis: 60000,
  max: 100,
}

const pools: {[key: string]: Pool} = {}

interface ClientInfo {
  client: PoolClient
  isTransactionOpen: boolean
}

export class PgClientFactory implements PgClient {
  clients: {[key: string]: ClientInfo} = {}

  private async getConnection(config: PoolConfig = DEFAULT_CONFIG): Promise<ClientInfo> {
    const key = this.getKey(config)
    const client = this.clients[key]
    if (client) {
      return client
    } else {
      return await this.createConnection(key, config)
    }
  }

  private async createConnection(key: string, config: PoolConfig): Promise<ClientInfo> {
    let pool = pools[key]
    if (!pool) {
      pool = new Pool(config)
      pools[key] = pool
    }
    const client: PoolClient = await pool.connect()
    const connection = {
      client,
      isTransactionOpen: false,
    }
    this.clients[key] = connection
    return connection
  }

  private getKey(config: ClientConfig): string {
    return config.host + '#' + config.port + '#' + config.user
  }

  public async commit(): Promise<void> {
    for (let key of Object.keys(this.clients)) {
      const connection = this.clients[key]
      if (connection.isTransactionOpen) {
        await connection.client.query('commit')
      }
      await connection.client.release()
      this.clearClient(key)
    }
  }

  public async rollback(): Promise<void> {
    for (let key of Object.keys(this.clients)) {
      const connection = this.clients[key]
      if (connection.isTransactionOpen) {
        await connection.client.query('rollback')
      }
      await connection.client.release()
      this.clearClient(key)
    }
  }

  private clearClient(key: string): void {
    delete this.clients[key]
  }

  public async query(sql: string, binds?: any[], config?: PoolConfig): Promise<any[]> {
    try {
      const connection = await this.getConnection(config || DEFAULT_CONFIG)
      if (!connection.isTransactionOpen) {
        await connection.client.query('begin')
        connection.isTransactionOpen = true
      }
      return (await connection.client.query(sql, binds)).rows
    } catch (e) {
      this.handleException(e, sql, binds)
    }
  }

  public async querySelect(sql: string, binds?: any[], config?: PoolConfig): Promise<any[]> {
    try {
      const client = await this.getConnection(config || DEFAULT_CONFIG)
      return (await client.client.query(sql, binds)).rows
    } catch (e) {
      this.handleException(e, sql, binds)
    }
  }

  public async queryOne(sql: string, binds?: any[], config?: PoolConfig): Promise<any> {
    try {
      const rows = await this.query(sql, binds, config)
      this.checkSingleRow(rows)
      return rows[0]
    } catch (e) {
      this.handleException(e, sql, binds)
    }
  }

  public async querySelectOne(sql: string, binds?: any[], config?: PoolConfig): Promise<any> {
    try {
      const rows = await this.querySelect(sql, binds, config)
      this.checkSingleRow(rows)
      return rows[0]
    } catch (e) {
      this.handleException(e, sql, binds)
    }
  }

  protected checkSingleRow(rows: any[]): void {
    if (rows.length > 1) {
      throw ERROR_TOO_MANY_ROWS
    }
  }

  protected handleException(exception: any, sql: string, binds: any[]) {
    console.error('SQL query exception:', exception)
    console.error('query: ', sql)
    console.error('binds: ', binds)
    throw exception
  }
}
