interface LogoProps {
	isDark: boolean;
	toggleTheme: () => void;
}

export function Logo({ isDark, toggleTheme }: LogoProps) {
	return (
		<button onClick={toggleTheme} className="flex items-center">
			<div className="w-12 h-6 bg-[#DCDCDC] rounded-full p-1 flex items-center cursor-pointer">
				<div className={`w-4 h-4 rounded-full bg-[#141414] dark:bg-[#E7E7E7] transform transition-transform duration-200 ease-in-out ${isDark ? 'translate-x-6' : ''}`} />
			</div>
			<span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">commit</span>
		</button>
	)
}