import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserPlus, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import StudentContext from '../context/StudentContext'
import StudentItem from '../components/students/StudentItem'
import Spinner from '../components/ui/Spinner'
import Alert from '../components/ui/Alert'

const StudentList = () => {
  const { students, loading, error, getStudents, deleteStudent } = useContext(StudentContext)
  
  const [filteredStudents, setFilteredStudents] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'asc' })
  
  useEffect(() => {
    // Apply sorting only, no filters or search
    let result = [...students]
    
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    
    setFilteredStudents(result)
  }, [students, sortConfig])
  
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id)
        toast.success('Student deleted successfully')
      } catch (err) {
        toast.error(err.message || 'Error deleting student')
      }
    }
  }
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="ml-1" />
    }
    
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="ml-1 text-primary-500" /> : 
      <FaSortDown className="ml-1 text-primary-500" />
  }
  
  if (loading) {
    return (
      <div className="page-container flex items-center justify-center h-64">
        <Spinner size="large" />
      </div>
    )
  }
  
  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          <p className="text-gray-600">Manage your student records</p>
        </div>
        <Link to="/students/add" className="btn btn-primary mt-4 md:mt-0 flex items-center justify-center md:justify-start">
          <FaUserPlus className="mr-2" /> Add Student
        </Link>
      </div>
      
      {error && (
        <Alert
          message={error}
          type="error"
          className="mb-6"
          onClose={() => {}}
        />
      )}
      
      {filteredStudents.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-500 mb-4">No students found</p>
          <Link to="/students/add" className="btn btn-primary inline-block">
            Add a Student
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('studentId')}
                >
                  <div className="flex items-center">
                    ID {getSortIcon('studentId')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('firstName')}
                >
                  <div className="flex items-center">
                    Name {getSortIcon('firstName')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email {getSortIcon('email')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center">
                    Department {getSortIcon('department')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('enrollmentYear')}
                >
                  <div className="flex items-center">
                    Year {getSortIcon('enrollmentYear')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('isActive')}
                >
                  <div className="flex items-center">
                    Status {getSortIcon('isActive')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <StudentItem 
                  key={student._id} 
                  student={student} 
                  onDelete={handleDelete} 
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StudentList
