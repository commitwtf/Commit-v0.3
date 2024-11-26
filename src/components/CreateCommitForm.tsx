'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Address, getAddress, parseUnits } from 'viem'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useCreateCommitment } from '@/hooks/useCommit'
import { useAllowance, useApprove, useToken } from '@/hooks/useToken'
import { COMMIT_CONTRACT_ADDRESS } from '@/config/contract'
import { useAccount } from 'wagmi'
import { TokenAmount } from './TokenAmount'
import { useQueryClient } from '@tanstack/react-query'

const CreateCommitmentSchema = z.object({
  tokenAddress: z.string().nonempty('Token address is required'),
  stakeAmount: z.number().min(0, 'Stake amount must be non-negative'),
  creatorFee: z.number().min(0, 'Creator fee must be non-negative'),
  description: z.string().nonempty('Description is required'),
  joinDeadline: z.string(),
  fulfillmentDeadline: z.string(),
})

const DECIMALS = 18
export function CreateCommitForm() {
  const { address } = useAccount()
  const form = useForm<z.infer<typeof CreateCommitmentSchema>>({
    resolver: zodResolver(CreateCommitmentSchema),
    defaultValues: {
      tokenAddress: '0x4200000000000000000000000000000000000006',
      stakeAmount: 0.0001,
      creatorFee: 0.0001,
      description: '',
      joinDeadline: new Date().toISOString().slice(0, 16),
      fulfillmentDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
        .toISOString()
        .slice(0, 16),
    },
  })

  const queryClient = useQueryClient()
  const tokenAddress = form.watch('tokenAddress') as Address
  const { data: allowance = 0, queryKey } = useAllowance(
    tokenAddress,
    address!,
    COMMIT_CONTRACT_ADDRESS
  )
  const token = useToken(tokenAddress, address)
  const approve = useApprove(tokenAddress, COMMIT_CONTRACT_ADDRESS)

  console.log(token.data)
  const transferAmount = parseUnits(String(Number(form.watch('stakeAmount') ?? 0)), DECIMALS)

  const router = useRouter()
  const { mutateAsync, isPending, error, failureReason } = useCreateCommitment()
  console.log('comp', { error, failureReason })
  return (
    <Form {...form}>
      <form
        className='relative space-y-6'
        onSubmit={form.handleSubmit(async (values) => {
          console.log('Create commitment', values)

          const stakeAmount = parseUnits(String(values.stakeAmount), DECIMALS)
          const creatorFee = parseUnits(String(values.creatorFee), DECIMALS)

          console.log(stakeAmount, creatorFee)
          return mutateAsync({
            tokenAddress: getAddress(values.tokenAddress),
            stakeAmount,
            creatorFee,
            description: values.description,
            joinDeadline: Math.floor(new Date(values.joinDeadline) / 1000),
            fulfillmentDeadline: Math.floor(new Date(values.fulfillmentDeadline) / 1000),
          }).then((res) => {
            console.log(res)
            alert(`Created: ${JSON.stringify(res)}`)
            // router.push('/commitments')
          })
        })}
      >
        <h1 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
          Commit to Something
        </h1>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Detailed overview' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tokenAddress'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Address</FormLabel>
              <FormControl>
                <Textarea placeholder='0x...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='joinDeadline'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Join Deadline</FormLabel>
                <FormControl>
                  <Input type='datetime-local' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fulfillmentDeadline'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fulfillment Deadline</FormLabel>
                <FormControl>
                  <Input type='datetime-local' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='stakeAmount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commit Stake</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='0'
                  step='0.00001'
                  placeholder='10'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='creatorFee'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator Fee</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min='0'
                  step='0.00001'
                  placeholder='1'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Note: to prevent spam, creating commit costs 0.001ETH. Thank you for your support. Let's
          commit!
        </p>
        {transferAmount > token.data?.value ? (
          <div>Insufficient balance</div>
        ) : transferAmount > allowance ? (
          <Button
            type='button'
            className='w-full bg-[#CECECE] hover:bg-[#BEBEBE] text-gray-900 h-10 text-sm font-medium transition-colors rounded-lg'
            isLoading={approve.isPending}
            onClick={() =>
              approve.writeContractAsync(BigInt(transferAmount)).then(() => {
                void queryClient.invalidateQueries({ queryKey })
              })
            }
          >
            Approve <TokenAmount value={transferAmount} token={tokenAddress} />
          </Button>
        ) : (
          <Button
            type='submit'
            isLoading={isPending}
            className='w-full bg-[#CECECE] text-gray-900 hover:bg-[#BEBEBE]'
          >
            Commit
          </Button>
        )}
      </form>
    </Form>
  )
}
