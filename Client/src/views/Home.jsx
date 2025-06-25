import React, { useEffect, useState } from 'react'
import StudentCard from '../components/StudentCard'
import axios from 'axios'
import { Link } from 'react-router'

function Home() {
    const [Students, setStudents] = useState([])

    const loadStudents = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`)
        setStudents(response.data.data)
        console.log("Students loaded:", response.data.data);
    }

    useEffect(() => { loadStudents() }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="max-w-6xl mx-auto py-16 px-6">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-5xl font-black text-blue-900 drop-shadow-lg tracking-tight">
                        Student Directory
                    </h1>
                    <Link
                        to="/add"
                        className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
                        title="Add Student"
                    >
                        <span className="text-white text-3xl font-bold group-hover:rotate-90 transition-transform duration-300">➕</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {Students.length === 0 ? (
                        <div className="col-span-full text-center text-blue-700 text-xl font-semibold py-20 animate-pulse">
                            No students found. Add a new student!
                        </div>
                    ) : (
                        Students.map(({ id, name, age, email }) => (
                            <div
                                key={id}
                                className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-200"
                            >
                                <StudentCard id={id} name={name} age={age} email={email} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* <Link
                to="/add"
                className="fixed bottom-8 right-8 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full p-5 shadow-2xl hover:scale-110 transition-transform duration-200 flex items-center justify-center group z-50"
                title="Add Student"
            >
                <span className="text-white text-3xl font-bold group-hover:rotate-90 transition-transform duration-300">➕</span>
            </Link> */}
        </div>
    )
}

export default Home