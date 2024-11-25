import { Address } from 'viem'
import { useToken } from '@/hooks/useToken'

export function TokenAmount(props: { formatted: string; token: Address }) {
  const token = useToken(props.token)

  return (
    <>
      {props.formatted} {token.data?.symbol}
    </>
  )
}
