'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Timer, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
	const [isDark, setIsDark] = useState(false)
	const [userCommits, setUserCommits] = useState([
		{ id: 1, title: "Collect 5 Phi x Cyber campaign Creds", participants: 245, amount: 5, timeRemaining: "02:15:30", progress: 60 },
		{ id: 2, title: "Collect 10 Phi x Cyber campaign Creds", participants: 157, amount: 10, timeRemaining: "01:45:20", progress: 40 },
	])

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

	return (
		<div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
			<Header isDark={isDark} toggleTheme={toggleTheme} />
			<div className="flex flex-1 overflow-hidden bg-[#E7E7E7] dark:bg-[#141414] transition-all duration-300 ease-in-out">
				<Sidebar currentPath="/profile" />
				<main className="flex-1 overflow-y-auto">
					<div className="max-w-7xl mx-auto p-6">
						<h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Commits</h1>

						{userCommits.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{userCommits.map((commit) => (
									<Link href={`/commit/${commit.id}`} key={commit.id}>
										<div className="bg-[#DCDCDC] dark:bg-[#2A2A2A] rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
											<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{commit.title}</h3>

											<div className="flex items-center gap-4 mb-4">
												<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
													<Users className="w-4 h-4" />
													<span className="text-sm">{commit.participants}</span>
												</div>
												<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
													<svg className="w-3 h-4" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
														<path fill="currentColor" d="m959.8 730.9-539.8 245.4 539.8 319.1 539.9-319.1z" />
														<path fill="currentColor" d="m420.2 976.3 539.8 319.1V730.9z" />
														<path fill="currentColor" d="M960 730.9v564.5l539.8-319.1z" />
														<path fill="currentColor" d="m959.8 0-539.8 895.5 539.8-245.4 539.9 245.4z" />
													</svg>
													<span className="text-sm">{commit.amount}</span>
												</div>
											</div>

											<div className="space-y-2 mb-4">
												<div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
													<span>Progress: {commit.progress}%</span>
													<span>{commit.timeRemaining} left</span>
												</div>
												<Progress value={commit.progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
											</div>
										</div>
									</Link>
								))}
							</div>
						) : (
							<div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4">
								<div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
									<AlertCircle className="w-4 h-4" />
									You haven't joined any commits yet. Explore active commits and start earning rewards!
								</div>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	)
}