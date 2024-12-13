import express from 'express';
const app = express();
import connectDB from './db.js';
import users from './src/users/usersRoute.js';

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
