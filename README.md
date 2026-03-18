# Job-Application-Tracker

A web application to track your job applications, built with React, TypeScript, JavaScript, and PostgreSQL. It allows users to add, edit, delete, and search job applications efficiently.

## Features

* Add Applications: Quickly add a new job with details like company, role, status, salary, and location.

* Edit Applications: Update your job application information at any time.

* Delete Applications: Remove applications you no longer need to track.

* Search Applications: Filter jobs by string matching.

* Persistent Data: Uses PostgreSQL for backend storage.

* Responsive UI: Built with React for a smooth and interactive experience.

## Tech Stack

**Frontend**: React, TypeScript, JavaScript

**Backend**: Node.js + Express

**Database**: PostgreSQL

**Package Manager**: npm

## Installation

Clone the repository:

`git clone https://github.com/laurenncasey/Job-Application-Tracker.git`
`cd job-application-tracker`

Install dependencies:

`npm install`

Set up PostgreSQL database:

Create a database (e.g., job_tracker) and a table applications with the columns:

`CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    status TEXT NOT NULL,
    applied_date DATE DEFAULT CURRENT_DATE,
    salary NUMERIC,
    location TEXT
);`

Run the backend server and edit job-tracker/server/db.js as needed:

`cd client/ && npm run dev`

Run the frontend:

`cd job-tracker/server/ && node index.js`

The app should now be running at http://localhost:5173/. 
