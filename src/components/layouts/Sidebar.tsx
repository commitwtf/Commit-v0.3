'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/Button'
import { NavItems } from './NavItems'

export function Sidebar() {
  return (
    <nav className='hidden md:flex md:w-64 md:flex-col bg-[#E7E7E7] dark:bg-[#141414] transition-all duration-300 ease-in-out h-full'>
      <div className='flex flex-col h-full'>
        <div className='flex-grow p-4 space-y-2'>
          <NavItems />
        </div>
        <div className='p-4 flex flex-col items-center'>
          <div className='flex items-center space-x-4 mb-2'>
            <Link href='https://x.com/commitwtf' target='_blank' rel='noopener noreferrer'>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-lg text-gray-900 dark:text-[#E0E0E0] hover:bg-[#DCDCDC] hover:text-gray-900'
              >
                <span className='sr-only'>Twitter</span>X
              </Button>
            </Link>
            <Link
              href='https://warpcast.com/~/channel/commit'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button
                variant='ghost'
                size='icon'
                className='rounded-lg text-gray-900 dark:text-[#E0E0E0] hover:bg-[#DCDCDC] hover:text-gray-900'
              >
                <span className='sr-only'>Farcaster</span>
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 1000 1000'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z'
                    fill='currentColor'
                  />
                  <path
                    d='M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z'
                    fill='currentColor'
                  />
                  <path
                    d='M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z'
                    fill='currentColor'
                  />
                </svg>
              </Button>
            </Link>
          </div>
          <span className='text-sm text-gray-500 dark:text-gray-400'>© Commit 2024</span>
        </div>
      </div>
    </nav>
  )
}
