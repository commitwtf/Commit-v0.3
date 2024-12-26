import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { Address, Hash, keccak256, toHex } from 'viem'

class MerkleTreeService {
  createMerkleTree(
    commitmentId: string,
    participants: Address[]
  ): StandardMerkleTree<[Hash, Hash]> {
    const leaves: Array<[Hash, Hash]> = participants.map((participant) => [
      keccak256(participant),
      keccak256(toHex(commitmentId)),
    ])

    const tree = StandardMerkleTree.of(leaves, ['bytes32', 'bytes32'])

    return tree
  }
}

const merkleTreeService = new MerkleTreeService()

export default merkleTreeService
