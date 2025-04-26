import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const StudentContext = createContext()

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const apiUrl = '/api/students'
  
  // Get all students
  const getStudents = async () => {
    setLoading(true)
    try {
      const response = await axios.get(apiUrl)
      setStudents(response.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching students')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }
  
  // Get student by id
  const getStudentById = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/${id}`)
      setStudent(response.data)
      setError(null)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching student')
      console.error('Error fetching student:', err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  // Add student
  const addStudent = async (studentData) => {
    setLoading(true)
    try {
      const response = await axios.post(apiUrl, studentData)
      setStudents(prevStudents => [...prevStudents, response.data])
      setError(null)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding student')
      console.error('Error adding student:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  // Update student
  const updateStudent = async (id, studentData) => {
    setLoading(true)
    try {
      const response = await axios.put(`${apiUrl}/${id}`, studentData)
      setStudents(students.map(student => 
        student._id === id ? response.data : student
      ))
      setError(null)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating student')
      console.error('Error updating student:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  // Delete student
  const deleteStudent = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`${apiUrl}/${id}`)
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id))
      setError(null)
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting student')
      console.error('Error deleting student:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  // Load students when component mounts
  useEffect(() => {
    getStudents()
  }, [])
  
  return (
    <StudentContext.Provider
      value={{
        students,
        student,
        loading,
        error,
        getStudents,
        getStudentById,
        addStudent,
        updateStudent,
        deleteStudent
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export default StudentContext
