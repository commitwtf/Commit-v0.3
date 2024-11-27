export interface Reward {
  name: string
  description: string
  tokens: number
  requirement: number
}
export const rewards: Reward[] = [
  {
    name: 'Basic Level Commit',
    description: 'Collect a minimum of 2 Creds from the Phi: Cyber Safari campaign',
    tokens: 1385,
    requirement: 2,
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
    tokens: 8310,
    requirement: 8,
  },
]
