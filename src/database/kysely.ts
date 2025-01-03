import { Kysely, PostgresDialect } from 'kysely'
import { CommitDatabase } from '@/database/types'
import { loadEnvConfig } from '@next/env'
import { Pool } from 'pg'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
})

export const db = new Kysely<CommitDatabase>({
  dialect,
})
export { sql } from 'kysely'
