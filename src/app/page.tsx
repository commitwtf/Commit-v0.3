'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { cyber } from 'viem/chains'
import { useChainId } from 'wagmi'

const HomePage = () => {
  const chainId = useChainId() || cyber.id
  const router = useRouter()
  useEffect(() => {
    router.replace(`/${chainId}`)
  }, [router, chainId])
  return <main className='flex-1 overflow-y-auto'>redirecting...</main>
}

export default HomePage
