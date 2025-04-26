import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StudentContext from '../context/StudentContext'
import StudentForm from '../components/students/StudentForm'
import Spinner from '../components/ui/Spinner'

const AddStudent = () => {
  const { addStudent, loading } = useContext(StudentContext)
  const navigate = useNavigate()
  
  const handleSubmit = async (formData) => {
    try {
      await addStudent(formData)
      toast.success('Student added successfully')
      navigate('/students')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding student')
    }
  }
  
  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Student</h1>
        <p className="text-gray-600">Create a new student record</p>
      </div>
      
      <div className="card">
        {loading ? (
          <div className="flex justify-center p-8">
            <Spinner size="large" />
          </div>
        ) : (
          <StudentForm 
            onSubmit={handleSubmit} 
            buttonText="Add Student" 
          />
        )}
      </div>
    </div>
  )
}

export default AddStudent