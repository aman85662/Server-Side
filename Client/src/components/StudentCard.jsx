import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function StudentCard({ id, name, age, email, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteStudent = async () => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;

        setIsDeleting(true);
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/students/${id}`);
            if (response.status === 200 && response.data.success) {
                toast.success(response.data.message || 'Student deleted successfully!');
                if (onDelete) onDelete(id);
            } else {
                toast.error(response.data.message || 'Failed to delete student.');
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error('Error deleting student.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="w-full max-w-xs bg-white rounded-3xl shadow-2xl p-7 flex flex-col items-center border border-blue-100 hover:scale-105 hover:shadow-blue-200 transition-all duration-300 relative overflow-hidden group">
            {/* Decorative Gradient Circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-300 via-blue-100 to-white rounded-full opacity-40 group-hover:opacity-60 transition-all duration-300 pointer-events-none" />
            {/* Avatar */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 mb-5 shadow-lg border-4 border-white">
                <span className="text-3xl font-extrabold text-white drop-shadow">{name[0]}</span>
            </div>
            {/* Name */}
            <h2 className="text-2xl font-extrabold text-blue-800 mb-1 tracking-wide">{name}</h2>
            {/* ID */}
            <p className="text-xs text-gray-400 mb-2">
                <span className="font-semibold text-gray-500">ID:</span> <span className="font-medium text-gray-700">{id}</span>
            </p>
            {/* Info */}
            <div className="flex flex-col items-center gap-1 mb-4">
                <span className="text-base text-gray-700">
                    <span className="font-semibold text-blue-600">Age:</span> {age}
                </span>
                <span className="text-base text-gray-700 break-all">
                    <span className="font-semibold text-blue-600">Email:</span> {email}
                </span>
            </div>
            {/* Actions */}
            <div className="flex gap-3 w-full mt-2">
                <button
                    onClick={deleteStudent}
                    disabled={isDeleting}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-0 rounded-full font-bold shadow transition-all duration-200
                        ${isDeleting
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:scale-105'
                        }`}
                    title="Delete Student"
                >
                    {isDeleting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Deleting...
                        </>
                    ) : (
                        <>
                            <span role="img" aria-label="delete">🗑️</span> Delete
                        </>
                    )}
                </button>
                <Link to={`/edit/${id}`} className="flex-1">
                    <button
                        className="w-full flex items-center justify-center gap-2 py-2 px-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-200"
                        title="Edit Student"
                    >
                        <span role="img" aria-label="edit">📝</span> Edit
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default StudentCard;
