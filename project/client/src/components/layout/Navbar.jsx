import { Link, useLocation } from 'react-router-dom'
import { FaGraduationCap, FaList, FaPlus, FaHome } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-500 border-primary-500' : 'text-gray-600 hover:text-primary-500 border-transparent'
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <FaGraduationCap className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-gray-800">StudentMS</span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex">
              <Link
                to="/"
                className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium ${isActive('/')}`}
              >
                <FaHome className="mr-1" /> Home
              </Link>
              
              <Link
                to="/students"
                className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium ${isActive('/students')}`}
              >
                <FaList className="mr-1" /> Students
              </Link>
              
              <Link
                to="/students/add"
                className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium ${isActive('/students/add')}`}
              >
                <FaPlus className="mr-1" /> Add Student
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="grid grid-cols-3 text-center">
          <Link
            to="/"
            className={`flex flex-col items-center py-2 text-xs font-medium ${isActive('/') ? 'text-primary-500' : 'text-gray-500 hover:text-primary-500'}`}
          >
            <FaHome className="h-5 w-5" />
            <span className="mt-1">Home</span>
          </Link>
          
          <Link
            to="/students"
            className={`flex flex-col items-center py-2 text-xs font-medium ${isActive('/students') ? 'text-primary-500' : 'text-gray-500 hover:text-primary-500'}`}
          >
            <FaList className="h-5 w-5" />
            <span className="mt-1">Students</span>
          </Link>
          
          <Link
            to="/students/add"
            className={`flex flex-col items-center py-2 text-xs font-medium ${isActive('/students/add') ? 'text-primary-500' : 'text-gray-500 hover:text-primary-500'}`}
          >
            <FaPlus className="h-5 w-5" />
            <span className="mt-1">Add</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar