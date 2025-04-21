
const Students = [
    {
        "name": "John Doe",
        "age": 20,
        "email": "ffhhgf",
        "id": 1
    }
];


const Health =  (req, res) => {
    res.json({
        success: true,
        message: 'Server is healthy',
    });
}
// Get method
const getStudents = (req, res) => {
    res.json({
        data: Students,
        success: true,
        message: 'Students fetched successfully',
    })
}
// POST method for resource creation
const postStudent =  (req, res) => {
    const { name, age, email, id } = req.body;

    const studentobj = {
        name,
        age,
        email,
        id
    };

    // Check for existing student properties and required fields...
    for (const Student of Students) {
        if (Student.id === id) {
            return res.status(400).json({
                success: false,
                message: `Student with id:${id} already exists`
            });
        } else if (Student.email === email) {
            return res.status(400).json({
                success: false,
                message: `Student with email:${email} already exists`
            });
        } else if (Student.name === name) {
            return res.status(400).json({
                success: false,
                message: `Student with name:${name} already exists`
            });
        }
    }

    if (!name || !age || !email || !id) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    // Add student then send response
    Students.push(studentobj);
    return res.json({
        data: studentobj,
        success: true,
        message: 'Student added successfully'
    });
}
// DELETE method for deleting resource
const deleteStudeent = (req, res) => {
    const idToDelete = Number(req.params.id);

    // Find student index
    const studentIndex = Students.findIndex(student => student.id === idToDelete);

    if (studentIndex === -1) {
        return res.status(400).json({
            success: false,
            message: `Student with id:${req.params.id} not found`
        });
    }

    Students.splice(studentIndex, 1);
    return res.json({
        success: true,
        message: `Student with id:${req.params.id} deleted successfully`
    });
}
//  PUT method for full update (requires all fields)
const updateStudent = (req, res) => {
    const idToUpdate = Number(req.params.id);
    const { name, age, email } = req.body;
    const studentIndex = Students.findIndex(student => student.id === idToUpdate);

    if (studentIndex === -1) {
        return res.status(400).json({
            success: false,
            message: `Student with id:${req.params.id} not found`
        });
    }

    if (!name || !age || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name, age, and email for full update'
        });
    }


    Students[studentIndex] = {
        id: idToUpdate, 
        name,
        age: parseInt(age),
        email
    };

    return res.status(200).json({
        data: Students[studentIndex],
        success: true,
        message: 'Student fully updated successfully'
    });
}
// Correct PATCH method for partial update (only update provided fields)
const updateStudentField = (req, res) => {
    const idToUpdate = Number(req.params.id);
    const { name, age, email } = req.body;
    const studentIndex = Students.findIndex(student => student.id === idToUpdate);

    if (studentIndex === -1) {
        return res.status(400).json({
            success: false,
            message: `Student with id:${req.params.id} not found`
        });
    }
    
    if (name !== undefined) {
        Students[studentIndex].name = name;
    }
    if (age !== undefined) {
        Students[studentIndex].age = parseInt(age);
    }
    if (email !== undefined) {
        Students[studentIndex].email = email;
    }

    return res.status(200).json({
        data: Students[studentIndex],
        success: true,
        message: 'Student partially updated successfully'
    });
}
//data by ID
const getStudentbyID = (req, res) => {
    const idToGet = Number(req.params.id);
    const student = Students.find(student => student.id === idToGet);

    if (!student) {
        return res.status(400).json({
            success: false,
            message: `Student with id:${req.params.id} not found`
        });
    }

    return res.status(200).json({
        data: student,
        success: true,
        message: 'Student fetched successfully'
    });
}

export  {Health,getStudents,postStudent,deleteStudeent,updateStudent,updateStudentField,getStudentbyID};