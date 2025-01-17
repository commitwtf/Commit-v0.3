'use client'
import {
  CommitmentStatus,
  useGetCommitmentDeadlines,
  useGetCommitmentDetails,
  useIsCommitCreator,
  useResolveCommitment,
  useParticipants
} from '@/hooks/useCommit'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Button } from './ui'
import { useState } from 'react'
import { Address, getAddress } from 'viem'
import { EnsName } from './ENS'

export function ResolveCommit({ commitId = '' }) {
  const [selectedWinners, setWinners] = useState<Record<Address, boolean>>({})
  const { mutateAsync, isPending } = useResolveCommitment()
  const { data, refetch } = useGetCommitmentDetails(commitId)
  const { data: deadlines } = useGetCommitmentDeadlines(commitId)
const { data: participants } = useParticipants(commitId)
  const isCreator = useIsCommitCreator(commitId)
  if (data?.status !== CommitmentStatus.Created) return null

  // Only visible for Commit creators
  if (!isCreator) return null

  // Only visible after fulfillmentDeadline
  if (!deadlines?.length) return null
  if (Date.now() < deadlines[1]) return null

  const winners = Object.entries(selectedWinners).filter(([_, isSelected]) => isSelected)


  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>Resolve winners</h3>
      <div className='bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-6'>
        <div className='mb-4'>
          {participants?.map((participant) => (
            <div key={participant} className=''>
              <Label className='gap-2 flex items-center py-2'>
                <Checkbox
                  onCheckedChange={(isSelected) =>
                    setWinners((s) => ({ ...s, [participant]: isSelected }))
                  }
                />
                <EnsName address={participant!} />
              </Label>
            </div>
          ))}
        </div>
        <Button
          className='w-full'
          disabled={isPending || !winners.length}
          isLoading={isPending}
          onClick={() =>
            mutateAsync({
              commitId,
              // Build array of selected winner addresses
              winners: winners.map(([address]) => getAddress(address)),
            })
              // TODO: Test to verify this updates the UI and changes the status to Resolved
              .then(() => refetch())
          }
        >
          Resolve Winners
        </Button>
      </div>
    </div>
  )
}
