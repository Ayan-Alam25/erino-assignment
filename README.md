# Expense Tracker

This project consists of a backend and frontend that communicate with each other. The backend uses MongoDB as the database and follows a RESTful API approach.

## Setup

### Backend

1. Navigate to the backend directory and install the backend dependencies:

   ```sh
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory and add the following environment variables:

   ```sh
   MONGO_URI=
   JWT_SECRET=
   ACCESS_TOKEN_SECRET=
   ACCESS_TOKEN_EXPIRES_IN=
   PORT=
   ```

3. Start the backend server:

   ```sh
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory and install the frontend dependencies:

   ```sh
   cd ../frontend
   npm install
   ```

2. Start the frontend development server:

   ```sh
   npm run dev
   ```

### Running the Application

Once both the frontend and backend are running, you can access the application at:

```
http://localhost:5000
```

## Project Description

The Expense Tracker application allows users to manage their financial transactions effectively by providing functionalities to add, update, and delete expenses while maintaining user authentication and secure data storage.

## Key Features

- **User Authentication:** Secure login and registration using JWT.
- **Expense Management:** Users can create, update, and delete expenses.
- **Data Persistence:** MongoDB is used for storing user and transaction data.
- **Responsive UI:** Built with React and TailwindCSS for a modern look.
- **Real-time Updates:** Transactions are updated dynamically.

## Tech Stack

- **Frontend:** Vite, React, TailwindCSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB with Mongoose ORM
