# Full-Stack Blog Website

This is a full-stack blog website built using React, Node.js, Express, MongoDB, and Redux. The website allows users to create, read, update, and delete blog posts. It also includes authentication features and an admin dashboard for user management.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)

## Features

- User authentication (Sign up, Log in, Log out)
- Create, read, update, and delete blog posts
- Admin dashboard for deleting users
- Responsive design
- State management with Redux
- Secure password handling with bcrypt
- Token-based authentication with JWT

## Technologies

- **Frontend:**

  - React
  - Redux
  - React Router

- **Backend:**

  - Node.js
  - Express
  - MongoDB

- **Others:**
  - JWT for authentication
  - bcrypt for password hashing
  - dotenv for environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yogi0808/MERN-Blog-Website.git
   cd MERN-Blog-Website
   ```

2. Install dependencies for both client and server:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the `server` directory and add your environment variables:

   ```env
   PORT=5000
   DB_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:

   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend server
   cd ../client
   npm run dev
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Sign up or log in to create and manage your blog posts.
3. As an admin, navigate to the admin dashboard to manage users.

## Screenshots

![Screenshot1](path/to/screenshot1.png)
![Screenshot2](path/to/screenshot2.png)
