import { client } from '@/lib/graphql'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { Address, getAddress, Hash, keccak256, toHex } from 'viem'
import gql from 'graphql-tag'
import { Commitment, Participant } from '@/app/api/commitments/types'

class CommitmentService {
  async getCommitment(commitmentId: string): Promise<Commitment | null | undefined> {
    const { data } = await client.query<{ commitment: Commitment | null | undefined }>(
      gql`
        query GetCommitment($commitmentId: String) {
          commitment(id: $commitmentId) {
            id
            participantCount
            status
            creator {
              id
              address
            }
            participants {
              id
            }
            winners {
              id
            }
          }
        }
      `,
      { commitmentId }
    )

    return data?.commitment
  }
}

class ParticipantService {
  mapParticipants(participants: Participant[]): Address[] {
    return participants.map<Address>((participant) => getAddress(participant.id.split('-')?.[1]))
  }

  async getParticipants(commitmentId: string): Promise<Address[]> {
    const { data } = await client.query<{ participants: Array<Participant> }>(
      gql`
        query GetParticipants($commitmentId: String) {
          participants(where: { commitment: $commitmentId }) {
            id
          }
        }
      `,
      { commitmentId }
    )

    return this.mapParticipants(data?.participants ?? [])
  }
}

class MerkleTreeService {
  createMerkleTree(
    commitmentId: string,
    participants: Address[]
  ): StandardMerkleTree<[Hash, Hash]> {
    // TODO: finalize, should align with SC regarding the hashing used for leaves
    const leaves: Array<[Hash, Hash]> = participants.map((participant) => [
      keccak256(participant),
      keccak256(toHex(commitmentId)),
    ])

    const tree = StandardMerkleTree.of(leaves, ['bytes32', 'bytes32'])

    return tree
  }
}

const merkleTreeService = new MerkleTreeService()
const participantService = new ParticipantService()
const commitmentService = new CommitmentService()

export { merkleTreeService, participantService, commitmentService }
