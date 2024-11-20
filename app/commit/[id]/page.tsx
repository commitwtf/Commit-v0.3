interface PageProps {
	params: {
		id: string
	}
}

export default function Page({ params }: PageProps) {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Commit {params.id}</h1>
			<p className="text-gray-600">Coming soon...</p>
		</div>
	)
}