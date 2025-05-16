import { createRoot } from 'react-dom/client'
import {  Routes,Route} from "react-router";
import './index.css'
import Home from './views/Home.jsx'
import Add from './views/Add.jsx'
import EditStudents from './views/EditStudents.jsx'

createRoot(document.getElementById('root')).render(
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<Add />} />
    <Route path="/edit/:userId" element={<EditStudents />} />
   </Routes>
)
