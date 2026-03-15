import Task from '../models/Task.js'

export const getAllTask = async (request, response) => {
    try {
        const { filter = 'today' } = request.query

        const now = new Date()
        let startDate = null

        switch (filter) {
            case 'today':
                startDate = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                )
                break
            case 'week':
                const mondayDate = now.getDate() - ((now.getDay() - 1 + 7) % 7)
                startDate = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    mondayDate
                )
                break
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1)
                break
            case 'all':
            default:
                startDate = null
                break
        }

        // Build match condition
        const matchStage = startDate ? { createdAt: { $gte: startDate } } : {}

        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [
                        { $match: matchStage },
                        { $sort: { createdAt: -1 } },
                    ],
                    activeCounts: [
                        { $match: { ...matchStage, status: 'active' } },
                        { $count: 'count' },
                    ],
                    completedCounts: [
                        { $match: { ...matchStage, status: 'complete' } },
                        { $count: 'count' },
                    ],
                },
            },
        ])

        const tasks = result[0]?.tasks
        const activeCounts2 = result[0]?.activeCounts[0]?.count || 0
        const completedCounts2 = result[0]?.completedCounts[0]?.count || 0

        response.status(200).json({ tasks, activeCounts2, completedCounts2 })
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhiệm vụ:', error)
        response.status(500).json({ message: 'Lỗi khi lấy danh sách nhiệm vụ' })
    }
}

export const createTask = async (request, response) => {
    try {
        const { title } = request.body
        const task = new Task({ title })
        const newTask = await task.save()
        response.status(201).json(newTask)
    } catch (error) {
        console.error('Lỗi khi tạo danh sách nhiệm vụ:', error)
        response.status(500).json({ message: 'Lỗi khi tạo danh sách nhiệm vụ' })
    }
}

export const updateTask = async (request, response) => {
    try {
        const { title, status, completedAt } = request.body
        const updateTask = await Task.findByIdAndUpdate(
            request.params.id,
            {
                title,
                status,
                completedAt,
            },
            { new: true }
        )
        if (!updateTask) {
            return response
                .status(404)
                .json({ message: 'Nhiệm vụ không tồn tại' })
        }
        response.status(200).json(updateTask)
    } catch (error) {
        console.error('Lỗi khi updateTask:', error)
        response.status(500).json({ message: 'Lỗi khi updateTask' })
    }
}

export const deleteTask = async (request, response) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(request.params.id)
        if (!deleteTask) {
            return response.status(404).json({ message: 'Lỗi delete' })
        }
        return response.status(200).json(deleteTask)
    } catch (error) {
        console.error('Lỗi khi DeleteTask:', error)
        response.status(500).json({ message: 'Lỗi khi DeleteTask' })
    }
}
