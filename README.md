# Store Rating Web Application

This is a full-stack web application built for the Roxiler Intern Coding Challenge. It allows users to submit ratings for stores, with different functionalities based on user roles.

## Tech Stack

*   **Backend:** Node.js, Express.js, Prisma
*   **Database:** PostgreSQL
*   **Frontend:** React.js, Vite

## Features

### System Administrator

*   Add new stores, normal users, and admin users.
*   Dashboard with:
    *   Total number of users
    *   Total number of stores
    *   Total number of submitted ratings
*   View a list of stores with details: Name, Email, Address, Rating.
*   View a list of normal and admin users with details: Name, Email, Address, Role.
*   Filter all listings based on Name, Email, Address, and Role.
*   View details of all users, including Name, Email, Address, and Role.
    *   If the user is a Store Owner, their Rating is also displayed.
*   Logout from the system.

### Normal User

*   Sign up and log in to the platform.
*   Update their password after logging in.
*   View a list of all registered stores.
*   Search for stores by Name and Address.
*   Store listings display:
    *   Store Name
    *   Address
    *   Overall Rating
    *   User's Submitted Rating
    *   Option to submit a rating
    *   Option to modify their submitted rating
*   Submit ratings (between 1 to 5) for individual stores.
*   Logout from the system.

### Store Owner

*   Log in to the platform.
*   Update their password after logging in.
*   Dashboard with:
    *   A list of users who have submitted ratings for their store.
    *   The average rating of their store.
*   Logout from the system.

## Getting Started

### Prerequisites

*   Node.js
*   npm
*   PostgreSQL

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/roxiler-intern-challenge.git
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

3.  **Frontend Setup:**

    ```bash
    cd frontend
    npm install
    ```

4.  **Database Setup:**

    *   Create a PostgreSQL database.
    *   Create a `.env` file in the `backend` directory and add the following environment variables:

        ```
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
        ```

5.  **Run the application:**

    *   **Backend:**

        ```bash
        cd backend
        npm run dev
        ```

    *   **Frontend:**

        ```bash
        cd frontend
        npm run dev
        ```

## Folder Structure

```
.
├── backend
│   ├── prisma
│   └── src
├── frontend
│   └── src
└── README.md
```

## License

This project is licensed under the MIT License.
