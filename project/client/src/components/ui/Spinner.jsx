const Spinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  }
  
  return (
    <div className="flex justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-t-2 border-b-2 border-primary-500`}></div>
    </div>
  )
}

export default Spinner