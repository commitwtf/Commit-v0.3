import { AlertCircle } from 'lucide-react'

interface WalletErrorProps {
	error: string | null
}

export function WalletError({ error }: WalletErrorProps) {
	if (!error) return null

	return (
		<div className='bg-red-50 dark:bg-red-950/50 rounded-lg p-4 mb-4'>
			<div className='flex items-center gap-2 text-sm text-red-600 dark:text-red-400'>
				<AlertCircle className='w-4 h-4' />
				{error}
			</div>
		</div>
	)
}