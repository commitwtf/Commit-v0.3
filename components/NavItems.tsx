import { Home, Plus, Gift, BookOpen, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface NavItemsProps {
	currentPath: string;
}

export function NavItems({ currentPath }: NavItemsProps) {
	return (
		<>
			<Link href="/" className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${currentPath === '/' ? 'bg-[#DCDCDC] text-gray-900' : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'}`}>
				<Home className="w-5 h-5" />
				Home
			</Link>
			<Link href="/create" className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${currentPath === '/create' ? 'bg-[#DCDCDC] text-gray-900' : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'}`}>
				<Plus className="w-5 h-5" />
				Create
			</Link>
			<Link href="/rewards" className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${currentPath === '/rewards' ? 'bg-[#DCDCDC] text-gray-900' : 'text-gray-700 hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900'}`}>
				<Gift className="w-5 h-5" />
				Rewards
			</Link>
			<Link href="https://commitwtf.notion.site/Commit-wiki-133ff6ac3d18809092f6fdcc85958bc3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900">
				<BookOpen className="w-5 h-5" />
				About
			</Link>
			<Link href="https://t.me/revmiller" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-[#DCDCDC] dark:text-[#E0E0E0] dark:hover:bg-[#DCDCDC] dark:hover:text-gray-900">
				<HelpCircle className="w-5 h-5" />
				Support
			</Link>
		</>
	)
}