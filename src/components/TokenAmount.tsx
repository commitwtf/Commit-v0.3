import { Address, formatUnits } from 'viem'
import { useToken } from '@/hooks/useToken'

export function TokenAmount(props: { value: bigint; token: Address }) {
  const token = useToken(props.token)
  if (typeof props.value === 'undefined') return null
  const value = formatUnits(props.value, token.data?.decimals ?? 18)

  return (
    <>
      {value} {token.data?.symbol}
    </>
  )
}
