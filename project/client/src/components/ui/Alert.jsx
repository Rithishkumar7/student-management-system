import { useState, useEffect } from 'react'
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa'

const Alert = ({ message, type = 'info', onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true)
  
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (onClose) setTimeout(onClose, 300) // Wait for fade-out animation
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])
  
  if (!visible) return null
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="h-5 w-5 text-green-400" />
      case 'warning':
        return <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
      case 'error':
        return <FaExclamationCircle className="h-5 w-5 text-red-400" />
      default:
        return <FaInfoCircle className="h-5 w-5 text-blue-400" />
    }
  }
  
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200'
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200'
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200'
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200'
    }
  }
  
  return (
    <div className={`rounded-md border p-4 ${getStyles()} transition-opacity duration-300`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={() => {
                setVisible(false)
                setTimeout(onClose, 300) // Wait for fade-out animation
              }}
              className="inline-flex text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alert