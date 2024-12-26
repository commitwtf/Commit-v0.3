import { Address, recoverMessageAddress, Signature } from 'viem'

class AuthService {
  async verify(
    accountAddr: Address,
    message: string,
    signature: `0x${string}` | Uint8Array | Signature
  ): Promise<boolean> {
    const recoveredAddr = await recoverMessageAddress({ message, signature })

    return accountAddr.toLowerCase() === recoveredAddr.toLowerCase()
  }
}

const authService = new AuthService()

export default authService
