import express from 'express';
import cors from 'cors';
import {getStudents,Health} from './controllers/student.js';
import { postStudent,deleteStudeent, updateStudent, updateStudentField,getStudentbyID } from './controllers/student.js';

const app = express();

const PORT = 5004;

app.use(cors());
app.use(express.json());

app.get('/health',Health);


app.get('/students',getStudents);


app.post('/students',postStudent);


app.delete('/students/:id',deleteStudeent);


app.put('/students/:id', updateStudent);

app.patch('/students/:id', updateStudentField);
app.get('/students/:id',getStudentbyID);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});