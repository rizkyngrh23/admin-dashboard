# Admin Dashboard

This is a comprehensive Admin Dashboard application built with Vue.js, Vuex, Vue Router, Vuetify, and Express.js. It includes features such as user authentication, profile management, employee management, attendance tracking, payroll, performance reviews, scheduling, and more.

## Features

- User Authentication (Register, Login, Logout)
- Profile Management
- Employee Management
- Attendance Tracking
- Payroll Management
- Performance Reviews
- Scheduling & Shift Planning
- Training & Development
- FAQs and IT Support Contact

## Technologies Used

- Frontend: Vue.js, Vuex, Vue Router, Vuetify
- Backend: Express.js, MongoDB, Mongoose
- Authentication: bcryptjs
- HTTP Client: Axios

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/admin-dashboard.git
    cd admin-dashboard
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

### Running the Application

1. Start the backend server:
    ```sh
    npm run start
    ```

2. Start the frontend development server:
    ```sh
    npm run serve
    ```

3. Open your browser and navigate to `http://localhost:8080`.

## Project Structure

- `src/`: Contains the frontend Vue.js application
  - `components/`: Vue components
  - `views/`: Vue views (pages)
  - `store/`: Vuex store
  - `router/`: Vue Router configuration
  - `assets/`: Static assets
- `server.js`: Entry point for the Express.js backend server
- `routes/`: Express.js routes
- `models/`: Mongoose models
- `dist/`: Built frontend assets (generated after running `npm run build`)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
