import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTSTRING)

        console.log('lien ket CSDL thanh cong')
    } catch (error) {
        console.log('loi khi ket noi CSDL')
        process.exit(1) // exit with error con 0 la sucssec
    }
}
