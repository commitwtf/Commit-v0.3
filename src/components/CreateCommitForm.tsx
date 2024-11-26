'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getAddress, parseUnits } from 'viem'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { useRouter } from 'next/navigation'
import { useCreateCommitment } from '@/hooks/useCommit'

const CreateCommitmentSchema = z.object({
  tokenAddress: z.string().nonempty('Token address is required'),
  stakeAmount: z.number().min(0, 'Stake amount must be non-negative'),
  creatorFee: z.number().min(0, 'Creator fee must be non-negative'),
  joinFee: z.number().min(0, 'Join fee must be non-negative'),
  description: z.string().nonempty('Description is required'),
  joinDeadline: z.date(),
  fulfillmentDeadline: z.date(),
})
export function CreateCommitForm() {
  const form = useForm<z.infer<typeof CreateCommitmentSchema>>({
    resolver: zodResolver(CreateCommitmentSchema),
    defaultValues: {
      tokenAddress: '',
      stakeAmount: 0,
      creatorFee: 0,
      joinFee: 0,
      description: '',
      joinDeadline: new Date(),
      fulfillmentDeadline: new Date(),
    },
  })

  const router = useRouter()
  const { mutateAsync, isPending } = useCreateCommitment()

  return (
    <Form {...form}>
      <form
        className='relative space-y-6'
        onSubmit={form.handleSubmit(async (values) => {
          console.log('Create commitment', values)

          const stakeAmount = parseUnits(String(values.stakeAmount), 18)
          const creatorFee = parseUnits(String(values.creatorFee), 18)

          return mutateAsync({
            tokenAddress: getAddress(values.tokenAddress),
            stakeAmount,
            creatorFee,
            description: values.description,
            joinDeadline: Math.floor(values.joinDeadline.getTime() / 1000),
            fulfillmentDeadline: Math.floor(values.fulfillmentDeadline.getTime() / 1000),
          }).then(() => {
            router.push('/commitments')
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
                  step='0.01'
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
                  step='0.01'
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
        <Button
          type='submit'
          isLoading={isPending}
          className='w-full bg-[#CECECE] text-gray-900 hover:bg-[#BEBEBE]'
        >
          Commit
        </Button>
      </form>
    </Form>
  )
}
