'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const handleSelect = (val: string) => {
    onValueChange(val)
    setOpen(false)
  }

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border px-4 py-2 text-sm shadow-sm focus:outline-none"
      >
        <span>{value || 'انتخاب کنید'}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-xl border bg-white shadow-lg">
          <div role="listbox">{
            React.Children.map(children, (child: any) =>
              React.cloneElement(child, {
                selectedValue: value,
                onSelect: handleSelect,
              })
            )
          }</div>
        </div>
      )}
    </div>
  )
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="text-muted-foreground">{placeholder}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="max-h-60 overflow-auto p-1">{children}</div>
}

export function SelectItem({ value, children, selectedValue, onSelect }: SelectItemProps & { selectedValue?: string, onSelect?: (val: string) => void }) {
  return (
    <div
      role="option"
      onClick={() => onSelect?.(value)}
      className={cn(
        'flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm hover:bg-muted',
        selectedValue === value && 'bg-muted font-medium'
      )}
    >
      {children}
      {selectedValue === value && <Check className="h-4 w-4 text-primary" />}
    </div>
  )
}
