interface PageProps {
	params: {
		id: string
	}
	searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams }: PageProps) {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Commit {params.id}</h1>
			<p className="text-gray-600">Coming soon...</p>
		</div>
	)
}

