import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { options } from '@/lib/data.js'

export default function DateTimeFilter({ onFilterChange }) {
    const [value, setValue] = useState('tất cả')

    const handleChange = (newValue) => {
        setValue(newValue)
        onFilterChange(newValue) // báo lên component cha
    }

    return (
        <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="w-[140px] mt-2">
                <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper"
                sideOffset={4}
                className="z-[999]">
                {options.map((item) => (
                    <SelectItem key={item.value} value={item.label}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}