'use client'

import { Shield, Target, Users, Zap, Wallet, DollarSign } from 'lucide-react'
import { Button } from '@/src/components'
import Link from 'next/link'

const AboutPage = () => {
	return (
		<main className='flex-1 overflow-y-auto'>
			<div className='max-w-7xl mx-auto p-6'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-2xl font-semibold text-gray-900 dark:text-white'>About Commit</h1>
					<div className='px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full'>
						<span className='text-sm font-medium text-gray-900 dark:text-white'>
							onchain accountability protocol
						</span>
					</div>
				</div>

				<div className='space-y-8'>
					<section>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
							The thesis is simple: commit to something.
						</h2>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							Personal commitments and goals often fail due to lack of real stakes and accountability. Traditional accountability methods (apps, coaches, groups) suffer from:
						</p>
						<ul className='list-disc pl-6 text-sm text-gray-600 dark:text-gray-400'>
							<li>Low engagement due to minimal consequences</li>
							<li>Manual verification and trust issues</li>
							<li>Limited financial incentives for commitment creators and platforms</li>
							<li>No standardized infrastructure for accountability</li>
						</ul>
					</section>

					<section>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
							It's time to Commit
						</h2>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
							Commit protocol provides blockchain infrastructure for stake-based accountability, enabling any platform or individual to create and manage commits (commitment challenges) where participants have real financial stakes in their success.
						</p>
						<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
							<Feature icon={<Shield />} title="Stake-Based Commitments" description="Participants lock tokens as stakes" />
							<Feature icon={<Target />} title="Multi-Party Incentives" description="Rewards for participants, creators, and platforms" />
							<Feature icon={<Users />} title="Flexible Integration" description="Custom commitment programs for any platform" />
							<Feature icon={<Zap />} title="Transparent Verification" description="Onchain resolution and reward distribution" />
							<Feature icon={<Wallet />} title="Token Agnostic" description="Support for any approved ERC20 token" />
						</div>
					</section>

					<section>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
							Fee Structure
						</h2>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							Commit protocol implements a transparent and fair fee structure to help us run our service and incentivize commit creators:
						</p>
						<div className='text-sm text-gray-600 dark:text-gray-400'>
							<span className='inline-flex items-center mr-4'>
								<DollarSign className='w-4 h-4 mr-1' /> 0.0002 ETH join fee
							</span>
							<span className='inline-flex items-center mr-4'>
								<DollarSign className='w-4 h-4 mr-1' /> Optional creator fee
							</span>
							<span className='inline-flex items-center'>
								<DollarSign className='w-4 h-4 mr-1' /> 1% protocol claim fee
							</span>
						</div>
					</section>

					<section>
						<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
							We're early and iterating
						</h2>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							We're fully bootstrapped, soft launched recently and iterating — any feedback is appreciated. We're committing to Commit, and are happy to commit together to building meaningful product, driving positive actions in real world and onchain.
						</p>
						<p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
							We'll update the docs, adding more user and creator guides soon — appreciate your patience.
						</p>
						<p className='text-sm text-gray-600 dark:text-gray-400'>
							If you have any questions, please reach out on{' '}
							<Link href="https://x.com/revrfg" className="text-blue-600 hover:underline">X</Link>,{' '}
							<Link href="https://warpcast.com/~/channel/commit" className="text-blue-600 hover:underline">Warpcast</Link>, or{' '}
							<Link href="https://t.me/revmiller" className="text-blue-600 hover:underline">Telegram</Link>.
						</p>
					</section>

					<div className='text-center'>
						<Link
							href="/create"
						>
							<Button
								className='inline-flex px-4 bg-[#CECECE] hover:bg-[#BEBEBE] text-gray-900 h-10 text-sm font-medium transition-colors rounded-lg'
							>
								commit to something
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}

const Feature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
	<div className='flex items-center gap-2'>
		<div className='text-gray-500 dark:text-gray-400'>{icon}</div>
		<div>
			<div className='text-sm text-gray-900 dark:text-white'>{title}</div>
			<div className='text-xs text-gray-500 dark:text-gray-400'>{description}</div>
		</div>
	</div>
)

export default AboutPage

