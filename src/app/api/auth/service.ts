import { Address, recoverMessageAddress, Signature } from 'viem'

class AuthService {
  async verify(
    accountAddr: Address,
    message: string,
    signature: `0x${string}` | Uint8Array | Signature
  ): Promise<{ verified: boolean; recoveredAddr: Address }> {
    const recoveredAddr = await recoverMessageAddress({ message, signature })

    return {
      verified: accountAddr.toLowerCase() === recoveredAddr.toLowerCase(),
      recoveredAddr,
    }
  }
}

const authService = new AuthService()

export default authService
