import { client } from '@/lib/graphql'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import gql from 'graphql-tag'
import { Address, getAddress, Hash, keccak256, toHex } from 'viem'

class ParticipantService {
  async getParticipants(commitmentId: string): Promise<Address[]> {
    const { data } = await client.query<{ participants: Array<{ id: `${string}-${Address}` }> }>(
      gql`
        query GetParticipants($commitmentId: String) {
          participants(where: { commitment: $commitmentId }) {
            id
          }
        }
      `,
      { commitmentId }
    )

    return (
      data?.participants.map<Address>((participant) =>
        getAddress(participant.id.split('-')?.[1])
      ) ?? []
    )
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

export { merkleTreeService, participantService }
