import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaUserGraduate, FaUserPlus, FaList } from 'react-icons/fa'
import StudentContext from '../context/StudentContext'
import Spinner from '../components/ui/Spinner'

const Home = () => {
  const { students, loading } = useContext(StudentContext)
  
  // Calculate stats
  const totalStudents = students.length
  const activeStudents = students.filter(student => student.isActive).length
  const inactiveStudents = totalStudents - activeStudents
  
  if (loading) {
    return (
      <div className="page-container flex items-center justify-center h-64">
        <Spinner size="large" />
      </div>
    )
  }
  
  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Student Management System</h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage your students with ease
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center">
            <FaUserGraduate className="h-10 w-10 mr-4" />
            <div>
              <p className="text-xl font-semibold">{totalStudents}</p>
              <p className="text-sm opacity-90">Total Students</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-success-500 to-green-600 text-white">
          <div className="flex items-center">
            <FaUserGraduate className="h-10 w-10 mr-4" />
            <div>
              <p className="text-xl font-semibold">{activeStudents}</p>
              <p className="text-sm opacity-90">Active Students</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          <div className="flex items-center">
            <FaUserGraduate className="h-10 w-10 mr-4" />
            <div>
              <p className="text-xl font-semibold">{inactiveStudents}</p>
              <p className="text-sm opacity-90">Inactive Students</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to="/students" 
              className="btn bg-primary-100 text-primary-700 hover:bg-primary-200 flex items-center justify-center py-4"
            >
              <FaList className="mr-2" /> View All Students
            </Link>
            <Link 
              to="/students/add" 
              className="btn bg-success-100 text-success-700 hover:bg-success-200 flex items-center justify-center py-4"
            >
              <FaUserPlus className="mr-2" /> Add New Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
