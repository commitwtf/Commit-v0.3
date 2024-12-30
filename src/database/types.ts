import { Address } from 'viem'
import { ColumnType } from 'kysely'

export interface AttestationTable {
  commitmentId: string
  attester: Address
  participant: Address
  createdAt: ColumnType<Date, string | undefined, never>
}

export interface CommitDatabase {
  attestations: AttestationTable
}
