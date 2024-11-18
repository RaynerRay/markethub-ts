import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Breadcrump = ({ title, resultCount }: { title: string; resultCount: number }) => {
  return (
   
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center text-sm">
        <Link href="/" className="text-slate-600 hover:text-emerald-500">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
        <span className="text-slate-800 font-medium">{title}</span>
      </div>
      <span className="text-slate-600">{resultCount} Properties Found</span>
    </div>

  )
}

export default Breadcrump