# MERN Stack CRUD

This project is a full-stack application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application includes authentication and email functionality.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Backend Installation](#backend-installation)
- [Frontend Installation](#frontend-installation)
- [Environment Setup](#environment-setup)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [Running the Application](#running-the-application)
  - [Backend](#backend-2)
  - [Frontend](#frontend-2)

## Getting Started

These instructions will help you set up and run the backend and frontend of the application on your local machine.

## Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js** (v16 or newer): [Download Node.js](https://nodejs.org/)
- **MongoDB** (running locally or with a connection URI): [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
- **Yarn** (optional but recommended for managing packages): [Yarn Installation Guide](https://yarnpkg.com/getting-started/install)

## Backend Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   yarn install
   ```

## Frontend Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   yarn install
   ```

## Environment Setup

## Backend

1. In the backend directory, locate the .env.sample file and rename it to .env:
   ```bash
   mv .env.sample .env
   ```
2. Open the .env file and set the following values:

- MONGO_URI: MongoDB connection string.
- JWT_SECRET: Secret key for JWT signing and verification.
- PORT: Port on which the server will run (default is 5000).
- EMAIL_FROM: Sender email address for email notifications.
- EMAIL_FROM_PASSWORD: App password or OAuth token for the sender email.

## Frontend

1. In the frontend directory, locate the .env.sample file and rename it to .env:
   ```bash
   mv .env.sample .env
   ```
2. Open the .env file and set the following values:

- REACT_APP_API_HOST: Backend API's host url completely with port.

## Running the Application

## Backend

To run the backend application in development mode, use:

```bash
cd backend
yarn run dev
```

## Frontend

To run the frontend application, open another terminal and use:

```bash
cd frontend
yarn start
```

The frontend should now be running on http://localhost:3000 (or on the port you specified in your React application).
