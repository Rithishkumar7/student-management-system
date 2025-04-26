import { Routes, Route } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import StudentList from './pages/StudentList'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import StudentDetails from './pages/StudentDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <StudentProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StudentProvider>
  )
}

export default App