// import React from 'react'
// import { CalendarDays } from 'lucide-react'

// function formatDate(dateStr) {
//     return new Date(dateStr).toLocaleString('vi-VN', {
//         year: 'numeric',
//         month: 'numeric',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true,
//     })
// }

// export default function TaskList({ tasks, isLoading }) {
//     if (isLoading) return <p className="text-center text-gray-400">Đang tải...</p>

//     if (!tasks || tasks.length === 0) {
//         return (
//             <div className="bg-white/60 rounded-2xl border border-gray-100 py-16 flex flex-col items-center justify-center gap-2 mb-4">
//                 <div className="w-10 h-10 rounded-full border-4 border-gray-200" />
//                 <p className="text-gray-500 font-medium">Chưa có nhiệm vụ.</p>
//                 <p className="text-gray-400 text-sm">Thêm nhiệm vụ đầu tiên vào để bắt đầu!</p>
//             </div>
//         )
//     }

//     return (
//         <div className="flex flex-col gap-3 mb-4">
//             {tasks.map((task) => (
//                 <div key={task._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow">
//                     <button className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${task.status === 'complete'
//                             ? 'bg-violet-500 border-violet-500'
//                             : 'border-gray-300 hover:border-violet-400'
//                         }`} />
//                     <div className="flex-1">
//                         <p className={`text-sm font-medium ${task.status === 'complete' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
//                             {task.title}
//                         </p>
//                         <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
//                             <CalendarDays size={12} />
//                             <span>{formatDate(task.createdAt)}</span>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

import { CalendarDays, Pencil, Trash2, Check, X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTaskApi, updateTaskApi } from '@/apis/TasksApi'
import { useState } from 'react'

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('vi-VN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    })
}

export default function TaskList({ tasks, isLoading }) {
    const queryClient = useQueryClient()
    const [editId, setEditId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    // const [useStatus, setUseStatus] = useState('active')
    const { mutate: deleteTask } = useMutation({
        mutationFn: deleteTaskApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/tasks'] }),
    })

    const { mutate: updateTask } = useMutation({
        mutationFn: updateTaskApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/tasks'] })
            setEditId(null)
        },
    })

    const handleToggleStatus = (task) => {
        updateTask({
            id: task._id,
            data: {
                status: task.status === 'complete' ? 'active' : 'complete',
                completedAt: task.status === 'complete' ? null : new Date().toISOString(),
            },
        })
    }

    const handleEditSave = (task) => {
        if (!editTitle.trim()) return
        updateTask({ id: task._id, data: { title: editTitle } })
    }

    if (isLoading) return <p className="text-center text-gray-400">Đang tải...</p>

    if (!tasks || tasks.length === 0) {
        return (
            <div className="bg-white/60 rounded-2xl border border-gray-100 py-16 flex flex-col items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full border-4 border-gray-200" />
                <p className="text-gray-500 font-medium">Chưa có nhiệm vụ.</p>
                <p className="text-gray-400 text-sm">Thêm nhiệm vụ đầu tiên vào để bắt đầu!</p>
            </div>
        )
    }



    return (
        <div className="flex flex-col gap-3 mb-4">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow group"
                >
                    <button
                        onClick={() => handleToggleStatus(task)}
                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${task.status === 'complete'
                            ? 'bg-violet-500 border-violet-500'
                            : 'border-gray-300 hover:border-violet-400'
                            }`}
                    />

                    <div className="flex-1">
                        {editId === task._id ? (
                            // Form chỉnh sửa inline
                            <div className="flex items-center gap-2">
                                <input
                                    autoFocus
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleEditSave(task)
                                        if (e.key === 'Escape') setEditId(null)
                                    }}
                                    className="flex-1 text-sm border border-violet-300 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-violet-300"
                                />
                                <button
                                    onClick={() => handleEditSave(task)}
                                    className="p-1 rounded-lg text-green-500 hover:bg-green-50"
                                >
                                    <Check size={15} />
                                </button>
                                <button
                                    onClick={() => setEditId(null)}
                                    className="p-1 rounded-lg text-gray-400 hover:bg-gray-50"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className={`text-sm font-medium ${task.status === 'complete' ? 'line-through text-gray-400' : 'text-gray-700'
                                    }`}>
                                    {task.title}
                                </p>
                                <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                                    <CalendarDays size={12} />
                                    <span>{formatDate(task.createdAt)}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {editId !== task._id && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => { setEditId(task._id); setEditTitle(task.title) }}
                                className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                <Pencil size={15} />
                            </button>
                            <button
                                onClick={() => deleteTask(task._id)}
                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}