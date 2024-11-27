import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex justify-center min-h-64 flex-col items-center'>
      <h2 className='text-xl font-semibold'>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}
