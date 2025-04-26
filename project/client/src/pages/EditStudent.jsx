// d:\project\project\client\src\pages\EditStudent.jsx
import { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentContext from '../context/StudentContext';
import StudentForm from '../components/students/StudentForm';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Destructure specific error/loading states if needed, otherwise rely on function returns/throws
  const { getStudentById, updateStudent } = useContext(StudentContext);
  const [student, setStudent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for fetching initial data
  const [updating, setUpdating] = useState(false); // Loading state for the update operation

  // Use useCallback to memoize fetchStudent based on dependencies
  const fetchStudent = useCallback(async () => {
    // console.log('fetchStudent triggered. Current loading state:', loading); // Debugging
    // Ensure loading is true only at the start of the fetch process
    setLoading(true);
    setNotFound(false); // Reset notFound state on new fetch attempt
    setStudent(null); // Clear previous student data before fetching
    try {
      // console.log('Fetching student with id:', id); // Debugging
      const data = await getStudentById(id);
      // console.log('Fetched student data:', data); // Debugging
      if (data) {
        setStudent(data);
      } else {
        // getStudentById returns null on error or not found
        setNotFound(true);
        toast.error('Student not found or error fetching data.'); // User feedback
      }
    } catch (error) {
      // This catch block might be redundant if getStudentById handles its own errors
      // and returns null, but good as a fallback.
      setNotFound(true);
      console.error('Error fetching student in EditStudent component:', error);
      toast.error('An unexpected error occurred while fetching student data.');
    } finally {
      // console.log('Setting loading to false'); // Debugging
      setLoading(false);
    }
  }, [id, getStudentById]); // Dependencies for useCallback

  // useEffect to call fetchStudent when the component mounts or id/fetchStudent changes
  useEffect(() => {
    // console.log('EditStudent useEffect triggered'); // Debugging
    fetchStudent();
  }, [fetchStudent]); // Dependency array includes the memoized fetchStudent

  const handleSubmit = async (formData) => {
    setUpdating(true);
    try {
      const updatedStudentData = await updateStudent(id, formData);
      if (updatedStudentData) {
        toast.success('Student updated successfully');
        navigate('/students'); // Navigate back to the list after successful update
      } else {
         // Handle case where updateStudent might return null/undefined on failure
         // (though it currently throws an error)
         toast.error('Failed to update student. Please try again.');
      }
    } catch (error) {
      // Catch errors thrown by updateStudent (e.g., network error, validation error from backend)
      console.error('Error updating student:', error);
      // Display specific backend error message if available, otherwise generic message
      toast.error(error?.response?.data?.message || error?.message || 'Error updating student');
    } finally {
      setUpdating(false);
    }
  };

  // --- Render Logic ---

  // Display loading spinner ONLY during the initial fetch
  if (loading) {
    return (
      <div className="page-container flex justify-center items-center h-64">
        <Spinner size="large" />
      </div>
    );
  }

  // Display "Not Found" message if the fetch failed or returned no data
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
            className="btn btn-secondary" // Use secondary for back buttons usually
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  // Display the form once loading is complete and student data is available
  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Student</h1>
        <p className="text-gray-600">Update student information for ID: {student?.studentId || id}</p>
      </div>

      <div className="card">
        {/* Show spinner overlay during the update process */}
        {updating && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10 rounded-lg">
             <Spinner size="large" />
          </div>
        )}
        {/* Render the form only if student data exists */}
        {student ? (
          <StudentForm
            student={student}
            onSubmit={handleSubmit}
            buttonText="Update Student"
          />
        ) : (
           // This case should ideally not be reached due to the loading/notFound checks above,
           // but provides a fallback.
           <Alert message="Could not load student data." type="warning" />
        )}
      </div>
    </div>
  );
};

export default EditStudent;
