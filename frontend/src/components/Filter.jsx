import React from 'react'
import { Badge } from '@/components/ui/badge'
import { ListFilter } from 'lucide-react'
import { FillterType } from '@/lib/data'

export default function Filter({ activeCounts, completedCounts, activeFilter, setActiveFilter }) {
    return (
        <div className="flex items-center justify-between mb-4">
            {/* Badges thống kê */}
            <div className="flex gap-2">
                <Badge variant="outline" className="text-violet-600 border-violet-300 bg-violet-50 rounded-full px-3 py-1 text-xs font-medium">
                    {activeCounts} đang làm
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50 rounded-full px-3 py-1 text-xs font-medium">
                    {completedCounts} hoàn thành
                </Badge>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2">
                {Object.keys(FillterType).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveFilter(key)}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all
                            ${activeFilter === key
                                ? 'bg-violet-500 text-white shadow-md'
                                : 'text-gray-500 hover:text-violet-500'
                            }`}
                    >
                        <ListFilter size={13} /> {FillterType[key]}
                    </button>
                ))}
            </div>
        </div>
    )
}