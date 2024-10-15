'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SearchPage() {
  const [url, setSearchValue] = useState('')

  return (
    <div className="grid grid-cols-5 gap-2">
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        aria-label="Search"
        type="text"
        placeholder="Search"
        className="block col-span-4 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
      />
      <Link
        href={'/book/0?url=' + url}
        className="p-2 text-center text-gray-500 transition-all bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        提交
      </Link>
    </div>
  )
}
