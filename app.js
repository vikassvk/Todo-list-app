const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/route');
const methodOverride = require('method-override');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));  // Enable method overriding

// Routes
app.use('/todos', todoRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/todos');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
