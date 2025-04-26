import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaSave, FaTimes } from 'react-icons/fa'

const currentYear = new Date().getFullYear()
const yearRange = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i)

const StudentForm = ({ student, onSubmit, buttonText = 'Submit' }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: currentYear,
    isActive: true
  })
  
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (student) {
      // Format date for input
      const formattedDate = student.dob 
        ? new Date(student.dob).toISOString().split('T')[0] 
        : ''
      
      // Only update formData if student prop differs from current formData
      if (
        student.studentId !== formData.studentId ||
        student.firstName !== formData.firstName ||
        student.lastName !== formData.lastName ||
        student.email !== formData.email ||
        formattedDate !== formData.dob ||
        student.department !== formData.department ||
        student.enrollmentYear !== formData.enrollmentYear ||
        (student.isActive !== undefined ? student.isActive : true) !== formData.isActive
      ) {
        setFormData({
          studentId: student.studentId || '',
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          email: student.email || '',
          dob: formattedDate,
          department: student.department || '',
          enrollmentYear: student.enrollmentYear || currentYear,
          isActive: student.isActive !== undefined ? student.isActive : true
        })
      }
    }
  }, [student, formData])
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required'
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be alphanumeric'
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required'
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }
    
    if (!formData.enrollmentYear) {
      newErrors.enrollmentYear = 'Enrollment year is required'
    } else if (formData.enrollmentYear < 2000 || formData.enrollmentYear > currentYear) {
      newErrors.enrollmentYear = `Year must be between 2000 and ${currentYear}`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      try {
        onSubmit(formData)
      } catch (error) {
        toast.error('Error submitting form: ' + error.message)
      }
    } else {
      toast.error('Please fix the errors in the form')
    }
  }
  
  const handleReset = () => {
    if (student) {
      // Reset to original student data
      const formattedDate = student.dob 
        ? new Date(student.dob).toISOString().split('T')[0] 
        : ''
        
      setFormData({
        studentId: student.studentId || '',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        dob: formattedDate,
        department: student.department || '',
        enrollmentYear: student.enrollmentYear || currentYear,
        isActive: student.isActive !== undefined ? student.isActive : true
      })
    } else {
      // Reset to empty form
      setFormData({
        studentId: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        department: '',
        enrollmentYear: currentYear,
        isActive: true
      })
    }
    setErrors({})
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="studentId" className="form-label">
            Student ID
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className={`form-input ${errors.studentId ? 'border-danger-500' : ''}`}
            placeholder="Enter student ID"
          />
          {errors.studentId && (
            <p className="mt-1 text-sm text-danger-500">{errors.studentId}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-input ${errors.firstName ? 'border-danger-500' : ''}`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-danger-500">{errors.firstName}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-input ${errors.lastName ? 'border-danger-500' : ''}`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-danger-500">{errors.lastName}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'border-danger-500' : ''}`}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-danger-500">{errors.email}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="dob" className="form-label">
            Date of Birth
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`form-input ${errors.dob ? 'border-danger-500' : ''}`}
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-danger-500">{errors.dob}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="department" className="form-label">
            Department
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`form-input ${errors.department ? 'border-danger-500' : ''}`}
            placeholder="e.g., Computer Science"
          />
          {errors.department && (
            <p className="mt-1 text-sm text-danger-500">{errors.department}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="enrollmentYear" className="form-label">
            Enrollment Year
            <span className="text-danger-500 ml-1">*</span>
          </label>
          <select
            id="enrollmentYear"
            name="enrollmentYear"
            value={formData.enrollmentYear}
            onChange={handleChange}
            className={`form-input ${errors.enrollmentYear ? 'border-danger-500' : ''}`}
          >
            {yearRange.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.enrollmentYear && (
            <p className="mt-1 text-sm text-danger-500">{errors.enrollmentYear}</p>
          )}
        </div>
        
        <div className="form-group flex items-center mt-6">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Active Student
          </label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary flex items-center"
        >
          <FaTimes className="mr-2" /> Reset
        </button>
        <button type="submit" className="btn btn-primary flex items-center">
          <FaSave className="mr-2" /> {buttonText}
        </button>
      </div>
    </form>
  )
}

export default StudentForm
