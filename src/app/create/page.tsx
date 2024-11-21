'use client'

import { Button, Input, Textarea } from '@/src/components'

const CreateCommitPage = () => {
  return (
    <main className='flex-1 overflow-y-auto'>
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
          Commit to Something
        </h1>
        <form className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
              I'm committing to...
            </label>
            <Input
              id='title'
              placeholder='One-liner description'
              className='w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700'
            />
          </div>
          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
              Description
            </label>
            <Textarea
              id='description'
              placeholder='Detailed overview'
              className='w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700'
            />
          </div>
          <div>
            <label
              htmlFor='resolution'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
            >
              Resolution Rules
            </label>
            <Textarea
              id='resolution'
              placeholder='What would count as success?'
              className='w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700'
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label
                htmlFor='deadline'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                Deadline
              </label>
              <Input
                id='deadline'
                type='datetime-local'
                className='w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700'
              />
            </div>
            <div>
              <label
                htmlFor='creatorFee'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                Creator Fee
              </label>
              <Input
                id='creatorFee'
                type='number'
                min='0'
                step='0.01'
                placeholder='1'
                className='w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700'
              />
            </div>
            <div>
              <label
                htmlFor='commitStake'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                Commit Stake
              </label>
              <Input
                id='commitStake'
                type='number'
                min='0'
                step='0.01'
                placeholder='10'
                className='w-full bg-[#DCDCDC] text-gray-900 border-gray-300 dark:border-gray-700'
              />
            </div>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Note: to prevent spam, creating commit costs 0.001ETH. Thank you for your support. Let's
            commit!
          </p>
          <Button type='submit' className='w-full bg-[#CECECE] text-gray-900 hover:bg-[#BEBEBE]'>
            Commit
          </Button>
        </form>
      </div>
    </main>
  )
}

export default CreateCommitPage
