
import { getTaskListApi } from '@/apis/TasksApi'
import AddTask from '@/components/AddTask.jsx'
import DateTimeFilter from '@/components/DateTimeFilter.jsx'
import Filter from '@/components/Filter.jsx'
import Footer from '@/components/Footer.jsx'
import Header from '@/components/Header'
import TaskList from '@/components/TaskList.jsx'
import TaskListPagination from '@/components/TaskListPagination.jsx'
import { visibleTaskLimit } from '@/lib/data'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function HomePage() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [dateFilter, setDateFilter] = useState('all') // ← đổi tên cho rõ
    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: ['/api/tasks', dateFilter], // ← thêm dateFilter vào key
        queryFn: () => getTaskListApi(dateFilter) // ← truyền filter vào api
    })

    const tasks = data?.data?.tasks || []
    const activeCounts = data?.data?.activeCounts2 || 0
    const completedCounts = data?.data?.completedCounts2 || 0

    const filteredTasks = tasks.filter((task) => {
        if (activeFilter === 'active') return task.status === 'active'
        if (activeFilter === 'completed') return task.status === 'complete'
        return true
    })


    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    )

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit)

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }
    return (
        <div className="min-h-screen w-full bg-white relative">
            <div className="absolute inset-0 z-0" style={{ /* ... giữ nguyên style */ }} />
            <div className='flex justify-center pt-8 mx-auto relative z-10'>
                <div className='w-full max-w-2xl'>
                    <Header />
                    <AddTask />
                    <Filter
                        activeCounts={activeCounts}
                        completedCounts={completedCounts}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />
                    <TaskList tasks={visibleTasks} isLoading={isLoading} />
                    <div className='flex flex-col items-center justify-between gap-6 sm:flex-row w-full max-w-2xl overflow-visible'>
                        <TaskListPagination visibleTaskLimit={visibleTaskLimit} handleNext={handleNext} handlePrev={handlePrev} totalPages={totalPages} page={page} />
                        <DateTimeFilter onFilterChange={setDateFilter} />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}