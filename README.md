# Student Management System

This repository contains a **full stack web application** for managing student records using CRUD (Create, Read, Update, Delete) operations.

Live frontend: [student-management-system-frontend-nfbi.onrender.com](https://student-management-system-frontend-nfbi.onrender.com/) [page:8]

## Features

- Add new student records with details such as name, ID, and other attributes.
- View a list of all students in a tabular UI.
- Update existing student information.
- Delete student records safely.
- Modern React-based frontend for an interactive user experience. (Adjust if you used plain JS/HTML instead.)

## Tech stack

- Frontend: JavaScript (React or vanilla JS) with HTML and CSS. [page:8]
- Backend: Node.js / Express or similar (hosted separately, used by the frontend for API calls).
- Deployment: Frontend hosted on Render (see live link above). [page:8]

## Project structure

Main directory in this repo: [page:8]

- `project/` – Contains the frontend source code (components, pages, styles, and configuration). [page:8]
- Inside `project/`, you will typically find:
  - JavaScript files for CRUD logic and API calls.
  - CSS files for styling the student management UI.
  - HTML or JSX entry file for rendering the app.

(You can update this section once you open `project/` and know the exact files, such as `App.js`, `index.js`, etc.)

## Getting started (local)

1. Clone the repository:

   ```bash
   git clone https://github.com/Rithishkumar7/student-management-system.git
   cd student-management-system/project
   ```

2. Install dependencies (if this is a Node/React project):

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```
   or

   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (often `http://localhost:3000`) in your browser to use the app.

> Make sure your backend API is running and the frontend is configured to call the correct base URL for student CRUD operations.

## Core CRUD operations

- **Create:** Fill in the student form and submit to add a new record.
- **Read:** View all students in the main table, optionally filter or sort.
- **Update:** Use the edit button/link on a student row to modify details.
- **Delete:** Use the delete button/link to remove a student record.

## Deployment

- The frontend is deployed to Render at  
  [student-management-system-frontend-nfbi.onrender.com](https://student-management-system-frontend-nfbi.onrender.com/). [page:8]
- Build the production bundle locally (for example, with `npm run build`) and deploy the `build/` or `dist/` folder to your hosting provider.

## License

Add your preferred license (for example, MIT) in a `LICENSE` file and reference it here.
