import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="page-container flex flex-col items-center justify-center py-12">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      
      <Link to="/" className="btn btn-primary flex items-center">
        <FaHome className="mr-2" /> Back to Home
      </Link>
    </div>
  )
}

export default NotFound