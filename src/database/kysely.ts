import { CommitDatabase } from '@/database/types'
import { createKysely } from '@vercel/postgres-kysely'

export const db = createKysely<CommitDatabase>()
export { sql } from 'kysely'
