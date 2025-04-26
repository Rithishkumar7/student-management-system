import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaEye, FaCircle } from 'react-icons/fa'

const StudentItem = ({ student, onDelete }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{student.studentId}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-900">
            {student.firstName} {student.lastName}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.department}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.enrollmentYear}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="flex items-center">
          <FaCircle 
            className={`mr-1 text-xs ${student.isActive ? 'text-success-500' : 'text-gray-400'}`} 
          />
          <span className={`text-sm ${student.isActive ? 'text-success-500 font-medium' : 'text-gray-500'}`}>
            {student.isActive ? 'Active' : 'Inactive'}
          </span>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          {/*
          <Link 
            to={`/students/${student._id}`}
            className="text-gray-600 hover:text-primary-500"
            title="View details"
          >
            <FaEye />
          </Link>
          */}
          <Link 
            to={`/students/edit/${student._id}`}
            className="text-gray-600 hover:text-primary-500"
            title="Edit student"
          >
            <FaEdit />
          </Link>
          <button
            onClick={() => onDelete(student._id)}
            className="text-gray-600 hover:text-danger-500"
            title="Delete student"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default StudentItem