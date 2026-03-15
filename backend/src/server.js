import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5001
const __dirName = path.resolve()

app.use(express.json())
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173' }))
}

//thz cors để cho phép fe gửi request đến be
// tài khoảng monggoDB
//hoanbaonguyendev_db_user PPNXZHCzdXXyyoha
app.use('/api/tasks', taskRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirName, '../frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirName, '../frontend/dist/index.html'))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server bat dau nghe cong 5001')
    })
})

// khi kết nối database thành công thì server mới bắt đầu lắng nghe cổng 5001, nếu kết nối database thất bại thì server sẽ không khởi động

// app.get("/api/tasks",(request,response)=>{
//     response.status(200).send("toi dang tao api nhap lan 20")
// })

// app.post('/api/tasks',(request,response)=>{
//     response.status(201).json({
//         message:"Nhiệm vụ đã được thêm thành công"
//     })
// })

// app.put("/api/tasks/:id",(request,response)=>{
//     response.status(200).json({
//         message:"nhiệm vụ đã được update thành công"
//     })
// })

// app.delete("/api/tasks/:id",(request,response)=>{
//     response.status(200).json({
//         message:"nhiệm vụ đã được xóa thành công"
//     })
// })
