import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StudentContext from '../context/StudentContext'
import StudentForm from '../components/students/StudentForm'
import Spinner from '../components/ui/Spinner'
import Alert from '../components/ui/Alert'

const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStudentById, updateStudent, loading, error } = useContext(StudentContext)
  const [student, setStudent] = useState(null)
  const [notFound, setNotFound] = useState(false)
  
  useEffect(() => {
    const fetchStudent = async () => {
      const data = await getStudentById(id)
      if (data) {
        setStudent(data)
      } else {
        setNotFound(true)
      }
    }
    
    fetchStudent()
  }, [id, getStudentById])
  
  const handleSubmit = async (formData) => {
    try {
      await updateStudent(id, formData)
      toast.success('Student updated successfully')
      navigate('/students')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating student')
    }
  }
  
  if (notFound) {
    return (
      <div className="page-container">
        <Alert 
          message="Student not found"
          type="error"
        />
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Student</h1>
        <p className="text-gray-600">Update student information</p>
      </div>
      
      <div className="card">
        {loading ? (
          <div className="flex justify-center p-8">
            <Spinner size="large" />
          </div>
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          student && (
            <StudentForm 
              student={student} 
              onSubmit={handleSubmit}
              buttonText="Update Student"
            />
          )
        )}
      </div>
    </div>
  )
}

export default EditStudent