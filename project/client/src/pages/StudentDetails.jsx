import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaEdit, FaArrowLeft, FaCalendar, FaEnvelope, FaUserGraduate, FaBuilding, FaCircle } from 'react-icons/fa'
import StudentContext from '../context/StudentContext'
import Spinner from '../components/ui/Spinner'
import Alert from '../components/ui/Alert'

const StudentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStudentById, loading, error } = useContext(StudentContext)
  const [student, setStudent] = useState(null)
  
  useEffect(() => {
    const fetchStudent = async () => {
      const data = await getStudentById(id)
      if (data) {
        setStudent(data)
      }
    }
    
    fetchStudent()
  }, [id, getStudentById])
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  if (loading) {
    return (
      <div className="page-container flex items-center justify-center h-64">
        <Spinner size="large" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="page-container">
        <Alert message={error} type="error" />
        <div className="mt-4">
          <button
            onClick={() => navigate('/students')}
            className="btn btn-primary"
          >
            Back to Students
          </button>
        </div>
      </div>
    )
  }
  
  if (!student) {
    return (
      <div className="page-container">
        <Alert message="Student not found" type="error" />
        <div className="mt-4">
          <button
            onClick={() => navigate('/students')}
            className="btn btn-primary"
          >
            Back to Students
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <button
          onClick={() => navigate('/students')}
          className="mb-4 sm:mb-0 inline-flex items-center text-gray-600 hover:text-primary-500"
        >
          <FaArrowLeft className="mr-2" /> Back to Students
        </button>
        
        <Link
          to={`/students/edit/${student._id}`}
          className="btn btn-primary inline-flex items-center"
        >
          <FaEdit className="mr-2" /> Edit Student
        </Link>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white p-2 rounded-full">
                <FaUserGraduate className="h-10 w-10 text-primary-500" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-primary-100">{student.studentId}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className={`flex items-center px-3 py-1 rounded-full ${
                student.isActive 
                  ? 'bg-success-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                <FaCircle className="h-2 w-2 mr-2" />
                {student.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaEnvelope className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDate(student.dob)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaBuilding className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{student.department}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Enrollment Year</p>
                    <p className="font-medium">{student.enrollmentYear}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h2>
            
            <div className="bg-gray-50 p-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">{formatDate(student.createdAt)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{formatDate(student.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails