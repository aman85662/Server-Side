import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
    const [students, setStudents] = useState({
        id: "",
        name: "",
        age: "",
        email: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addStudent = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/students`, {
                id: Number(students.id),
                name: students.name,
                age: Number(students.age),
                email: students.email
            });
            if (response.data.success) {
                setStudents({
                    id: "",
                    name: "",
                    age: "",
                    email: ""
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (e) {
            toast.error("Error adding student. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-blue-100">
                <h1 className="text-3xl font-extrabold text-blue-800 mb-2 text-center tracking-tight drop-shadow">Add Student</h1>
                <p className="text-blue-500 text-center mb-8">Fill in the details below to add a new student.</p>
                <div className="flex flex-col gap-5">
                    <div>
                        <label className="block text-blue-700 font-medium mb-1 ml-1">Student ID</label>
                        <input
                            type="number"
                            placeholder="Enter student ID"
                            onChange={(e) => setStudents({ ...students, id: e.target.value })}
                            value={students.id}
                            className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-blue-700 font-medium mb-1 ml-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            onChange={(e) => setStudents({ ...students, name: e.target.value })}
                            value={students.name}
                            className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-blue-700 font-medium mb-1 ml-1">Age</label>
                        <input
                            type="number"
                            placeholder="Enter age"
                            onChange={(e) => setStudents({ ...students, age: e.target.value })}
                            value={students.age}
                            className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-blue-700 font-medium mb-1 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            onChange={(e) => setStudents({ ...students, email: e.target.value })}
                            value={students.email}
                            className="w-full border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>
                    <button
                        onClick={addStudent}
                        disabled={loading}
                        className={`mt-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all font-bold text-lg flex items-center justify-center gap-2 ${
                            loading ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            "Add Student"
                        )}
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-2 bg-white border border-blue-300 text-blue-700 py-2 rounded-xl shadow hover:bg-blue-50 transition-all font-semibold"
                        type="button"
                    >
                        Back to Home
                    </button>
                </div>
                <Toaster position="top-center" />
            </div>
        </div>
    );
};

export default Add;
