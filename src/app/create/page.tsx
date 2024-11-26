'use client'

import { CreateCommitForm } from '@/components/CreateCommitForm'

const CreateCommitPage = () => {
  return (
    <main className='flex-1 overflow-y-auto'>
      <CreateCommitForm />
      <div className='max-w-3xl mx-auto p-6'>
        <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
          <h1 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>Coming Soon</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            The ability to create new commitments will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}

export default CreateCommitPage
