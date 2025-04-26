import Student from '../models/Student.js';
import { validationResult } from 'express-validator';

// @desc    Get all students
// @route   GET /api/students
// @access  Public
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Public
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (student) {
      res.json(student);
    } else {
      res.status(404);
      throw new Error('Student not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
};

// @desc    Create a student
// @route   POST /api/students
// @access  Public
export const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { 
      studentId, 
      firstName, 
      lastName, 
      email, 
      dob, 
      department, 
      enrollmentYear, 
      isActive 
    } = req.body;

    const studentExists = await Student.findOne({ 
      $or: [{ studentId }, { email }] 
    });

    if (studentExists) {
      res.status(400);
      throw new Error('Student already exists with this ID or email');
    }

    const student = await Student.create({
      studentId,
      firstName,
      lastName,
      email,
      dob,
      department,
      enrollmentYear,
      isActive
    });

    if (student) {
      res.status(201).json(student);
    } else {
      res.status(400);
      throw new Error('Invalid student data');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Public
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }
    
    // Check if email is unique when updating
    if (req.body.email && req.body.email !== student.email) {
      const emailExists = await Student.findOne({ email: req.body.email });
      if (emailExists) {
        res.status(400);
        throw new Error('Email already in use');
      }
    }
    
    // Check if studentId is unique when updating
    if (req.body.studentId && req.body.studentId !== student.studentId) {
      const idExists = await Student.findOne({ studentId: req.body.studentId });
      if (idExists) {
        res.status(400);
        throw new Error('Student ID already in use');
      }
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Public
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }
    
    await Student.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
};