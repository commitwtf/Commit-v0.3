'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'

import { useWETH } from '@/hooks/useWETH'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'
import { cn } from '@/utils'

const DepositSchema = z.object({
  amount: z.string(),
})

export function WrapETH() {
  const [isOpen, setOpen] = useState(false)
  const { address } = useAccount()
  const balance = useBalance({ address })
  const { mutateAsync, isPending } = useWETH()
  const form = useForm<z.infer<typeof DepositSchema>>({
    resolver: zodResolver(DepositSchema),
    defaultValues: { amount: '' },
  })

  const amount = parseEther(form.watch('amount') || '0')
  const insufficientBalance = amount > (balance.data?.value || 0)

  const isLoading = isPending || form.formState.isSubmitting
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        variant='outline'
        className='w-full bg-[#DCDCDC] dark:bg-[#2A2A2A] text-gray-900 dark:text-[#E0E0E0] hover:bg-[#CECECE] dark:hover:bg-[#3A3A3A]'
      >
        Wrap ETH
      </Button>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              console.log('deposit', values)
              const value = parseEther(values.amount)
              return mutateAsync({ value }).then(() => setOpen(false))
            })}
          >
            <DialogHeader>
              <DialogTitle>Wrap ETH</DialogTitle>
              <DialogDescription>Enter amount of ETH to deposit.</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder='0' step='0.00000001' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={cn('py-1 text-right text-sm text-gray-600', {
                ['text-red-600']: insufficientBalance,
              })}
            >
              Balance: {balance.data?.formatted}
            </div>
            <DialogFooter>
              <Button
                type='submit'
                disabled={isLoading || insufficientBalance || !amount}
                isLoading={isLoading}
              >
                Despoit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
