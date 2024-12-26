import express from 'express';
import cors from 'cors';
const app = express();
import connectDB from './db.js';
import users from './src/users/usersRoute.js';

const PORT = 3000;

connectDB();

const corsOptions = {
    origin: "http://localhost:5173", // Replace with the allowed URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.use(express.json());

// Connect to the database

// Middleware for /api/users route
app.use("/users", users); // Pass the imported router

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
