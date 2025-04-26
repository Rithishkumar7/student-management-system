// d:\project\project\client\src\components\students\StudentForm.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaSave, FaTimes } from 'react-icons/fa';

const currentYear = new Date().getFullYear();
// Corrected year range calculation (inclusive of currentYear)
const yearRange = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i).reverse(); // Often makes sense to show recent years first

const StudentForm = ({ student, onSubmit, buttonText = 'Submit' }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: currentYear,
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  // --- MODIFIED useEffect ---
  useEffect(() => {
    // This effect now runs only when the 'student' prop object itself changes.
    if (student) {
      // Format date for input ('YYYY-MM-DD')
      const formattedDate = student.dob
        ? new Date(student.dob).toISOString().split('T')[0]
        : '';

      setFormData({
        studentId: student.studentId || '',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        dob: formattedDate,
        department: student.department || '',
        enrollmentYear: student.enrollmentYear || currentYear,
        // Ensure isActive defaults correctly if undefined/null in the student data
        isActive: student.isActive !== undefined && student.isActive !== null ? student.isActive : true,
      });
      // Reset errors when new student data is loaded or form is reset
      setErrors({});
    } else {
      // Optional: Reset form if student prop becomes null/undefined (e.g., for AddStudent)
      setFormData({
        studentId: '',
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        department: '',
        enrollmentYear: currentYear,
        isActive: true,
      });
      setErrors({});
    }
    // --- Only depend on the student prop ---
  }, [student]);
  // --- END MODIFIED useEffect ---

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be alphanumeric';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
        // Optional: Add date validation (e.g., not in the future)
        const dobDate = new Date(formData.dob);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
        if (dobDate > today) {
            newErrors.dob = 'Date of birth cannot be in the future';
        }
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.enrollmentYear) {
      newErrors.enrollmentYear = 'Enrollment year is required';
    } else if (formData.enrollmentYear < 2000 || formData.enrollmentYear > currentYear) {
      newErrors.enrollmentYear = `Year must be between 2000 and ${currentYear}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Make sure to send isActive as boolean
        onSubmit({ ...formData, isActive: Boolean(formData.isActive) });
      } catch (error) {
        // This catch might be redundant if onSubmit handles its own errors,
        // but good as a fallback.
        console.error("Error during onSubmit call:", error);
        toast.error('Error submitting form: ' + (error.message || 'Unknown error'));
      }
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const handleReset = () => {
    // Re-trigger the useEffect logic by temporarily setting student to null
    // This avoids duplicating the reset logic.
    // Note: This approach works but might feel slightly indirect.
    // Alternatively, duplicate the reset logic from useEffect here.
    if (student) {
        const formattedDate = student.dob
            ? new Date(student.dob).toISOString().split('T')[0]
            : '';
        setFormData({
            studentId: student.studentId || '',
            firstName: student.firstName || '',
            lastName: student.lastName || '',
            email: student.email || '',
            dob: formattedDate,
            department: student.department || '',
            enrollmentYear: student.enrollmentYear || currentYear,
            isActive: student.isActive !== undefined && student.isActive !== null ? student.isActive : true,
        });
    } else {
        setFormData({
            studentId: '',
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            department: '',
            enrollmentYear: currentYear,
            isActive: true,
        });
    }
    setErrors({});
    toast.info('Form reset');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Form Fields (No changes needed here) --- */}
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
            // Disable studentId field if editing an existing student
            disabled={!!student}
            aria-disabled={!!student}
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
            {/* Add a default disabled option */}
            <option value="" disabled>Select year</option>
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

        <div className="form-group flex items-center mt-6 md:mt-8"> {/* Adjusted margin for alignment */}
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
      {/* --- END Form Fields --- */}

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200"> {/* Added padding and border */}
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary flex items-center"
          // Disable reset if it's not an edit form (no initial student data)
          // disabled={!student}
        >
          <FaTimes className="mr-2" /> Reset
        </button>
        <button type="submit" className="btn btn-primary flex items-center">
          <FaSave className="mr-2" /> {buttonText}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
