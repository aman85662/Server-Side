import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";

const EditStudents = () => {
    const [students, setStudents] = useState({
        name: "",
        age: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();

    const updateStudent = async () => {
        try {
            setIsLoading(true);
            const response = await axios.put(`https://server-side-41oz.onrender.com//students/${userId}`, {
                name: students.name,
                age: students.age,
                email: students.email
            });
            if (response.data.success) {
                toast.success(response.data.message || "Student updated successfully!");
            } else {
                toast.error(response.data.message || "Failed to update student.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
            toast.error("Error updating student. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadStudent = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://server-side-41oz.onrender.com/students/${userId}`);
            if (response.status === 200) {
                setStudents(response.data);
                toast.success("Student loaded successfully!");
            } else {
                toast.error("Failed to load student.");
            }
        } catch (error) {
            console.error("Error loading student:", error);
            toast.error("Error loading student. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            loadStudent();
        }
    }, [userId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                    Edit Student ({userId})
                </h1>
                <div className="flex flex-col gap-4">
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
                        onClick={updateStudent}
                        disabled={isLoading}
                        className={`mt-4 ${
                            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        } text-white py-2 rounded transition-colors font-semibold`}
                    >
                        {isLoading ? "Updating..." : "Edit Student"}
                    </button>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default EditStudents;

