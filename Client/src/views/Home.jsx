import React, { useEffect, useState } from 'react'
import StudentCard from '../components/StudentCard'
import axios from 'axios'
import { Link } from 'react-router' 

function Home() {
    const [Students, setStudents] = useState([])

    const loadStudents = async () => {
        const response = await axios.get("https://server-side-41oz.onrender.com/students")
        setStudents(response.data.data)
    }

    useEffect(() => { loadStudents() }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="max-w-5xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10 drop-shadow">
                    All Students
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {Students.map(({ id, name, age, email }) => (
                        <div key={id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200">
                            <StudentCard id={id} name={name} age={age} email={email} />
                        </div>
                    ))}
                </div>
            </div>
            <Link
                to="/add"
                className="fixed bottom-8 right-8 bg-blue-600 rounded-full p-4 shadow-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                title="Add Student"
            >
               <p className="text-white text-2xl font-bold">➕</p>
            </Link>
        </div>
    )
}

export default Home