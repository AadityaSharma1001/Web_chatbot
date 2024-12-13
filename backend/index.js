const express = require('express');
const app = express();
const connectDB = require('./db');
const users = require('./src/users/usersRoute'); // Import the router

const PORT = 3000;

app.use(express.json());

// Connect to the database
connectDB();

// Middleware for /api/users route
app.use("/api/users", users); // Pass the imported router

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});


// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Chat application');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
