import express from 'express';
import { 
  getStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../controllers/studentController.js';
import { check } from 'express-validator';

const router = express.Router();

// Validation middleware
const validateStudent = [
  check('studentId', 'Student ID is required').notEmpty().isAlphanumeric(),
  check('firstName', 'First name is required').notEmpty().isLength({ min: 2 }),
  check('lastName', 'Last name is required').notEmpty().isLength({ min: 2 }),
  check('email', 'Please include a valid email').isEmail(),
  check('dob', 'Date of birth is required').notEmpty(),
  check('department', 'Department is required').notEmpty(),
  check('enrollmentYear', 'Enrollment year is required')
    .notEmpty()
    .isInt({ min: 2000, max: new Date().getFullYear() })
];

// Routes
router.route('/')
  .get(getStudents)
  .post(validateStudent, createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;