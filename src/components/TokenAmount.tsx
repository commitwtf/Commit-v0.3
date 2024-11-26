import { Address, formatUnits } from 'viem'
import { useToken } from '@/hooks/useToken'

export function TokenAmount(props: { formatted: string; value: bigint; token: Address }) {
  const token = useToken(props.token)
  const value = formatUnits(props.value, token.data?.decimals ?? 18)

  return (
    <>
      {value} {token.data?.symbol}
    </>
  )
}
