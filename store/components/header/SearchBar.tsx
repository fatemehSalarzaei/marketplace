'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="hidden md:block relative w-[600px]">
        <Input
          type="text"
          placeholder="جستجو"
          className="bg-neutral-100 pl-4 pr-10 h-10 rounded-full text-sm text-neutral-700 placeholder:text-neutral-500 border-none focus:ring-0 focus:outline-none"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-neutral-500" />
      </div>

      <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
        <Search className="w-6 h-6 text-gray-700" />
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white p-4 rounded-md w-11/12 max-w-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold">جستجو</span>
            <button onClick={() => setIsOpen(false)} className="text-sm">بستن</button>
          </div>
          <Input
            type="text"
            placeholder="جستجو..."
            className="bg-neutral-100 h-10 rounded-md w-full"
            autoFocus
          />
        </div>
      </Dialog>
    </>
  )
}

