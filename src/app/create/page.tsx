'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon } from "lucide-react"

const APPROVED_TOKENS = [
	{ symbol: 'ETH', address: 'native', decimals: 18 },
	{ symbol: 'USDC', address: '0x...', decimals: 6 },
	// Add other approved tokens
]

export default function CreateCommit() {
	return (
		<main className="flex-1 overflow-y-auto bg-[#E7E7E7] dark:bg-[#141414] transition-all duration-300 ease-in-out">
			<div className="max-w-3xl mx-auto p-6">
				<h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Commit to Something</h1>
				<form className="space-y-6">
					<div>
						<label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">I'm committing to...</label>
						<Input id="title" placeholder="One-liner description" className="w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700" />
					</div>
          <div>
						<label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image</label>
						<div className="relative h-[100px] rounded-lg bg-[#DCDCDC] dark:bg-gray-700 border border-gray-300 dark:border-gray-600 overflow-hidden">
							<input
								type="file"
								id="image"
								accept="image/*"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
							/>
							<div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
								<ImageIcon className="w-6 h-6 mb-1" />
								<span className="text-sm">Click to upload image</span>
							</div>
						</div>
					</div>
					<div>
						<label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
						<Textarea id="description" placeholder="Detailed overview" className="w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700" />
					</div>
					<div>
						<label htmlFor="resolution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resolution Rules</label>
						<Textarea id="resolution" placeholder="What would count as success?" className="w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						<div>
							<label htmlFor="joinDeadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Join Deadline</label>
							<Input id="joinDeadline" type="datetime-local" className="w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700" />
						</div>
						<div>
							<label htmlFor="fulfillDeadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fulfill Deadline</label>
							<Input id="fulfillDeadline" type="datetime-local" className="w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700" />
						</div>
					</div>
					<div className="space-y-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commit Stake</label>
							<div className="flex gap-2">
								<Input 
									id="commitStake" 
									type="number" 
									min="0" 
									step="0.01" 
									placeholder="10" 
									className="flex-1 bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700" 
								/>
								<Select defaultValue={APPROVED_TOKENS[0].address}>
									<SelectTrigger className="w-[120px] bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700">
										<SelectValue placeholder="Token" />
									</SelectTrigger>
									<SelectContent>
										{APPROVED_TOKENS.map((token) => (
											<SelectItem key={token.address} value={token.address}>
												{token.symbol}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div>
							<label htmlFor="creatorFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Creator Fee</label>
							<Input 
								id="creatorFee" 
								type="number" 
								min="0" 
								step="0.01" 
								placeholder="1" 
								className="w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700" 
							/>
						</div>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">Note: to prevent spam, creating commit costs 0.001ETH. Thank you for your support. Let's commit!</p>
					<Button type="submit" className="w-full bg-[#CECECE] text-gray-900 hover:bg-[#BEBEBE]">Commit</Button>
				</form>
			</div>
		</main>
	)
}