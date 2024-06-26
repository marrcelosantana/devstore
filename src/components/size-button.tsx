import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function SizeButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className={twMerge(
        'flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold',
        className,
      )}
      {...props}
    />
  )
}
