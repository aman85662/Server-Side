import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditStudents = () => {
    const [students, setStudents] = useState({
        name: "",
        age: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();

    const updateStudent = async () => {
        if (!students.name || !students.age || !students.email) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/students/${userId}`,
                {
                    name: students.name,
                    age: Number(students.age),
                    email: students.email
                }
            );
            if (response.data.success) {
                toast.success(response.data.message || "Student updated successfully!");
            } else {
                toast.error(response.data.message || "Failed to update student.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
            toast.error(error.response?.data?.message || "Failed to update student.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadStudent = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${userId}`);
            if (response.status === 200 && response.data.success) {
                setStudents(response.data.data);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-100">
                <h1 className="text-3xl font-extrabold text-blue-800 mb-2 text-center tracking-tight">
                    Edit Student
                </h1>
                <p className="text-center text-blue-500 mb-8 text-sm">
                    Update the details for <span className="font-semibold">{userId}</span>
                </p>
                <form
                    className="flex flex-col gap-6"
                    onSubmit={e => {
                        e.preventDefault();
                        updateStudent();
                    }}
                >
                    <div>
                        <label className="block text-blue-700 font-medium mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter full name"
                            onChange={(e) => setStudents({ ...students, name: e.target.value })}
                            value={students.name}
                            className="border border-blue-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label className="block text-blue-700 font-medium mb-1" htmlFor="age">
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            placeholder="Enter age"
                            onChange={(e) => setStudents({ ...students, age: e.target.value })}
                            value={students.age}
                            className="border border-blue-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            min={1}
                        />
                    </div>
                    <div>
                        <label className="block text-blue-700 font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            onChange={(e) => setStudents({ ...students, email: e.target.value })}
                            value={students.email}
                            className="border border-blue-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            autoComplete="off"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-2 flex items-center justify-center gap-2 ${
                            isLoading
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        } text-white py-3 rounded-lg transition-colors font-semibold shadow`}
                    >
                        {isLoading && (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                        )}
                        {isLoading ? "Updating..." : "Save Changes"}
                    </button>
                </form>
                <Toaster position="top-center" />
            </div>
        </div>
    );
};

export default EditStudents;
