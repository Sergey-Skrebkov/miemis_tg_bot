import {PoolConfig} from "pg";

export interface PgClient {
  query(sql: string, binds?: any[], config?: PoolConfig): Promise<any[]>
  queryOne(sql: string, binds?: any[], config?: PoolConfig): Promise<any>
  querySelect(sql: string, binds?: any[], config?: PoolConfig): Promise<any[]>
  querySelectOne(sql: string, binds?: any[], config?: PoolConfig): Promise<any>
}