import { formatDistanceToNow, formatDuration, intervalToDuration } from 'date-fns'

export const toNow = (date?: string | number, opts = { addSuffix: true }) =>
  date ? formatDistanceToNow(date, opts) : undefined

export function formatSecondsToDays(seconds = 0) {
  const duration = intervalToDuration({ start: 0, end: seconds })
  return formatDuration(duration, { format: ['days', 'hours', 'minutes'] })
}
