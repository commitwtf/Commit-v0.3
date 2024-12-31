import { Address } from 'viem'
import { ColumnType } from 'kysely'

/**
DROP TABLE IF EXISTS attestations;

CREATE TABLE attestations (
  commitment_id VARCHAR(255) NOT NULL, -- String mapped to VARCHAR
  attester VARCHAR(42) NOT NULL,      -- Ethereum Address (42 characters)
  participant VARCHAR(42) NOT NULL,   -- Ethereum Address (42 characters)
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Auto-generate timestamp
  PRIMARY KEY (commitment_id, attester, participant) -- Composite primary key
);
 */
export interface AttestationTable {
  commitment_id: string
  attester: Address
  participant: Address
  created_at: ColumnType<Date, string | undefined, never>
}

export interface CommitDatabase {
  attestations: AttestationTable
}
