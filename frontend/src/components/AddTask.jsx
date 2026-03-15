import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTaskApi } from '@/apis/TasksApi'

export default function AddTask() {
    const [title, setTitle] = useState('')
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: addTaskApi,
        onSuccess: () => {
            setTitle('')
            queryClient.invalidateQueries({ queryKey: ['/api/tasks'] })
        },
    })

    const handleAdd = () => {
        if (!title.trim()) return
        mutate(title)
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex gap-3">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="Cần phải làm gì?"
                className="flex-1 border-gray-200 focus-visible:ring-violet-400"
            />
            <Button
                onClick={handleAdd}
                disabled={isPending}
                className="bg-violet-500 hover:bg-violet-600 text-white rounded-xl px-5"
            >
                <Plus size={16} className="mr-1" />
                {isPending ? 'Đang thêm...' : 'Thêm'}
            </Button>
        </div>
    )
}