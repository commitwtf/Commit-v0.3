import { cn } from '@/utils'
import Link from 'next/link'
import { type ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h4' | 'h5' | 'h6'
const createHeading = (Component: Headings) => (props: ComponentProps<Headings>) =>
  <Component {...props} className='font-semibold text-gray-900 dark:text-white' />

export function Markdown({ className, ...props }: ComponentProps<typeof ReactMarkdown>) {
  return (
    <ReactMarkdown
      components={{
        h1: createHeading('h1'),
        h2: createHeading('h2'),
        h3: createHeading('h3'),
        h4: createHeading('h4'),
        h5: createHeading('h5'),
        h6: createHeading('h6'),
        p: (props) => <p {...props} className='text-gray-800 dark:text-gray-200' />,
        a: (props) => {
          // Handle external links
          const externalProps = props.href?.includes('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}
          return (
            <Link
              {...props}
              {...externalProps}
              className={'text-blue-600 dark:text-blue-400 no-underline hover:underline'}
              href={props.href!}
            />
          )
        },
      }}
      className={cn('prose max-w-full', className)}
      {...props}
    />
  )
}
Markdown.displayName = 'Markdown'
