# Productivity Manager Application

This is a Productivity Manager application built with React and Node.js, with a MongoDB backend. The application currently allows users to create, read, update, and delete tasks. It also features a simple server for handling API requests. 

Amongst the planned features are a Google Calendar integration, allowing users to improve an already outstanding productivity management experience. Unlike other applications, this is designed to have an optimal layout whilst taking up only fraction of your monitor, and was designed with secondary/vertical monitors in mind. 

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new tasks
- Mark tasks as completed
- Update task descriptions
- Delete tasks
- Responsive design
- Persistent storage using MongoDB

## Planned/Upcoming Features

- Google Calendar integration
- Personal Accounts/Athentication
- Manage tasks based on personal arrangements/heirarchy, or based on due date/priority
- Overhauled task organization system
- Custom due date email notifications

### Screenshots

![image](https://github.com/dilawaramin/Productivity-Application/assets/79779873/0a354061-eb00-4305-844d-a5e9b361f7d3)

![image](https://github.com/dilawaramin/Productivity-Application/assets/79779873/5e986cb5-471c-4c34-a88e-c85f6990b10e)

![image](https://github.com/dilawaramin/Productivity-Application/assets/79779873/61e7f919-f6a6-49ea-91c0-09169f48c90f)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/dilawaramin/productivity-application.git
    cd task-manager
    ```

2. **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add your MongoDB connection string:

    ```env
    MONGO_URI=your_mongodb_connection_string
    ```

## Usage

1. **Start the server:**

    ```bash
    cd server
    npm start
    ```

    The server will start on `http://localhost:5004`.

2. **Start the client:**

    ```bash
    cd ../client
    npm start
    ```

    The client will start on `http://localhost:3000`.

## Project Structure

### Client

- `index.js`: Entry point of the React application.
- `App.jsx`: Main component of the application.
- `Header.jsx`: Component for the header section.
- `TaskContainer.jsx`: Component that displays the list of tasks.
- `Task.jsx`: Component for individual tasks.
- `AddTask.jsx`: Component for adding new tasks.
- `TaskComplete.jsx`: Component for displaying completed tasks.
- `TaskModal.jsx`: Component for displaying a modal for task details.
- `App.css`, `index.css`: CSS files for styling the application.

### Server

- `server.js`: Main server file that handles API requests.
- `task.js`: Mongoose schema for tasks.
- `.env`: Environment variables (not included in the repository, to be created by the user).

## API Endpoints

### Tasks

- **GET** `/api/tasks`: Retrieve all tasks from the database.
- **POST** `/api/tasks`: Add a new task to the database.
- **PATCH** `/api/tasks/:id`: Mark a task as completed.
- **PATCH** `/api/tasks/desc/:id`: Update the description of a task.
- **DELETE** `/api/tasks/:id`: Delete a task from the database.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
