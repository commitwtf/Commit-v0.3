'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'
import { CommitCard } from '@/components/CommitCard'

export default function Home() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const isDarkMode = localStorage.getItem('darkMode') === 'true'
		setIsDark(isDarkMode)
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
		}
	}, [])

	const toggleTheme = () => {
		const newIsDark = !isDark
		setIsDark(newIsDark)
		localStorage.setItem('darkMode', newIsDark.toString())
		document.documentElement.classList.toggle('dark')
	}

	const commits = [
		{ id: 1, title: "Collect 5 Phi x Cyber campaign Creds", participants: 245, committedValue: 0.2, timeRemaining: "02:15:30" },
		{ id: 2, title: "Collect 10 Phi x Cyber campaign Creds", participants: 157, committedValue: 0.5, timeRemaining: "01:45:20" },
		{ id: 3, title: "Collect all Phi x Cyber campaign Creds", participants: 89, committedValue: 1.0, timeRemaining: "00:59:59" },
	]

	return (
		<div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
			<Header isDark={isDark} toggleTheme={toggleTheme} />
			<div className="flex flex-1 overflow-hidden bg-[#E7E7E7] dark:bg-[#141414] transition-all duration-300 ease-in-out">
				<Sidebar currentPath="/" />
				<main className="flex-1 overflow-y-auto">
					<div className="max-w-7xl mx-auto p-6">
						{/* Promotional Banner */}
						<div className="relative overflow-hidden bg-gradient-to-r from-[#1a5e1a] via-[#2ecc71] to-[#66ff66] rounded-lg p-6 mb-6">
							<div className="relative z-10">
								<h2 className="text-2xl font-bold mb-2 text-white">Commit x Phi x Cyber Campaign</h2>
								<p className="mb-4 text-white/90">Join our exciting new campaign and earn exclusive rewards!</p>
								<Button className="bg-white text-[#2ecc71] hover:bg-gray-100 hover:text-[#1a5e1a] transition-colors duration-300">
									Learn More
								</Button>
							</div>
							<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
							<div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
						</div>

						<div className="flex justify-between items-center mb-6">
							<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Active Commits</h1>
							<div className="px-4 py-1.5 bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-full">
								<span className="text-sm font-medium text-gray-900 dark:text-white">
									Total Commits: {commits.length}
								</span>
							</div>
						</div>

						<div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 mb-6">
							<div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
								<AlertCircle className="w-4 h-4" />
								Participate in commits to earn rewards and climb the leaderboard!
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{commits.map((commit) => (
								<CommitCard key={commit.id} {...commit} />
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}