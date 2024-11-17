const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const port = 3055;

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing form data and serving static files
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
