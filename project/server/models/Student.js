import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, 'Student ID must be alphanumeric']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  enrollmentYear: {
    type: Number,
    required: [true, 'Enrollment year is required'],
    min: [2000, 'Enrollment year must be 2000 or later'],
    max: [new Date().getFullYear(), 'Enrollment year cannot be in the future']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;