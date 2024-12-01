const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://user6756:mohith%402006@mohithsai.jfx6b.mongodb.net/?retryWrites=true&w=majority&appName=MOHITHSAI')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(express.json());

// Routes
app.use('/', imageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
