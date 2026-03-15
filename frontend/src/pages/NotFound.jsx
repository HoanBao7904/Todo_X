import React from 'react'

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <img src="images.png" alt="not found 404" className='max-w-full mb-6' />
            <p className='text-xl font-semibold'>
                Bạn đi vào vùng cấm
            </p>
            <a href="/" className='px-4 py-2 bg-blue-400 rounded-2xl shadow-2xl mt-3'>Quay về trang chủ</a>
        </div>
    )
}
