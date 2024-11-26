'use client'
import {
  CommitmentStatus,
  useGetCommitmentDetails,
  useIsCommitCreator,
  useResolveCommitment,
} from '@/hooks/useCommit'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Button } from './ui'
import { useState } from 'react'
import { Address, getAddress } from 'viem'

export function ResolveCommit({ commitId = '' }) {
  const [selectedWinners, setWinners] = useState<Record<Address, boolean>>({})
  const { mutateAsync, isPending } = useResolveCommitment()
  const { data, refetch } = useGetCommitmentDetails(commitId)

  const isCreator = useIsCommitCreator(commitId)
  if (data?.status !== CommitmentStatus.Created) return null

  // Only visible for Commit creators
  if (!isCreator) return null

  return (
    <div>
      {data?.participants?.map((participant) => (
        <div key={participant.address} className=''>
          <Label className='gap-2 flex items-center py-2'>
            <Checkbox
              onCheckedChange={(isSelected) =>
                setWinners((s) => ({ ...s, [participant.address]: isSelected }))
              }
            />
            <pre>{participant.address}</pre>
          </Label>
        </div>
      ))}
      <Button
        isLoading={isPending}
        onClick={() =>
          mutateAsync({
            commitId,
            // Build array of selected winner addresses
            winners: Object.entries(selectedWinners)
              .filter(([address, isSelected]) => isSelected)
              .map(([address]) => getAddress(address)),
          })
            // TODO: Test to verify this updates the UI and changes the status to Resolved
            .then(() => refetch())
        }
      >
        Resolve Winners
      </Button>
    </div>
  )
}