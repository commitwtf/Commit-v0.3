import { formatDistanceToNow, formatDuration, intervalToDuration } from 'date-fns'

export const toNow = (date?: string | number, opts = { addSuffix: true }) =>
  date ? formatDistanceToNow(date, opts) : undefined

export function formatSecondsToDays(seconds = 0) {
  const now = new Date()
  const targetDate = new Date(seconds)
  if (now > targetDate) return '--'
  const duration = intervalToDuration({ start: now, end: targetDate })

  const formattedDuration = formatDuration(duration, {
    delimiter: ', ',
    format: ['days', 'hours', 'minutes'],
  })

  return formattedDuration
}
