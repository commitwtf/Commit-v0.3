export interface Reward {
  name: string
  description: string
  tokens: number
  requirement: number
  remainingSlots?: number
  totalSlots?: number
  commitId?: string;
}
export const rewards: Reward[] = [
  {
    name: 'Basic Level Commit',
    description: 'Collect a minimum of 2 Creds from the Phi: Cyber Safari campaign',
    tokens: 1385,
    requirement: 2,
    totalSlots: 3000,
    commitId: '14',
  },
  {
    name: 'Medium Level Commit',
    description: 'Collect a minimum of 4 Creds from the Phi: Cyber Safari campaign',
    tokens: 4155,
    requirement: 4,
  },
  {
    name: 'Ultimate Level Commit',
    description: 'Collect all 8 Creds from the Phi: Cyber Safari campaign',
    tokens: 6925,
    requirement: 8,
  },
]
