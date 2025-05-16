import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router'

function StudentCard({ id, name, age, email }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteStudent = async () => {
        if (!window.confirm('Are you sure you want to delete this student?')) {
            return
        }

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`)
            if (response.status === 200 && response.data.success) {
                toast.success(response.data.message || 'Student deleted successfully!')
            } else {
                toast.error(response.data.message || 'Failed to delete student.')
            }
            setIsDeleting(true)
            setTimeout(() => {
                setIsDeleting(false)
            }, 2000)
    }

    return (
        <div className="w-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-blue-200 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 mb-4 shadow">
                <span className="text-2xl font-bold text-white">{name[0]}</span>
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-1">{name}</h2>
            <p className="text-xs text-gray-500 mb-2">ID: <span className="font-medium text-gray-700">{id}</span></p>
            <div className="flex flex-col items-center gap-1 mb-3">
                <span className="text-base text-gray-700">
                    <span className="font-semibold">Age:</span> {age}
                </span>
                <span className="text-base text-gray-700 break-all">
                    <span className="font-semibold">Email:</span> {email}
                </span>
            </div>
            <button
                onClick={deleteStudent}
                disabled={isDeleting}
                className={`mt-2 ${isDeleting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white py-2 px-5 rounded-full transition-colors font-bold shadow`}
                title="Delete Student"
            >
                {isDeleting ? 'Deleting...' : '🗑️ Delete'}
            </button>
            <Link to={`/edit/${id}`}>
                <button
                    className="mt-2 bg-blue-500 text-white py-2 px-5 rounded-full hover:bg-blue-600 transition-colors font-bold shadow"
                    title="Edit Student"
                >
                    📝 Edit
                </button>
            </Link>
        </div>
    )
}

export default StudentCard