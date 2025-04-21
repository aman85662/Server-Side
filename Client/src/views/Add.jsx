import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
    const [students, setStudents] = useState({
        id: "",
        name: "",
        age: "",
        email: ""
    });

    const addStudent = async () => {
        try {
            const response = await axios.post("http://localhost:5004/students", {
                id: students.id,
                name: students.name,
                age: students.age,
                email: students.email
            });
            console.log(response.data);
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
            console.error("Error adding student:", e);
            toast.error("Error adding student. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Add Student</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="ID"
                        onChange={(e) => setStudents({ ...students, id: e.target.value })}
                        value={students.id}
                        className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setStudents({ ...students, name: e.target.value })}
                        value={students.name}
                        className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        onChange={(e) => setStudents({ ...students, age: e.target.value })}
                        value={students.age}
                        className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setStudents({ ...students, email: e.target.value })}
                        value={students.email}
                        className="border border-blue-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={addStudent}
                        className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Add Student
                    </button>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default Add;
