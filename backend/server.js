const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
///connect to DB
connectDB();
const app = express();

/// middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to FREEJNA Events App API ' });
});

//Routes

//Register Route
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

//Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port number ${PORT}`));
