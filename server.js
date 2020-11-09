const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

// Init App
const app = express();

// Dotenv Config
dotenv.config();

// Connect DB
require('./config/db')();

// Helmet.js
app.use(helmet());
// Public Dir
app.use(express.static(path.join(__dirname, 'public')));
// JSON middleware
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// 404 Middleware
app.use(function (req, res, next) {
    res.status(404).json({
        message: 'Not Found',
    });
});

// Error Handler
if (process.env.NODE_ENV !== 'development') {
    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error!',
        });
    });
}

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(
        `Server Running in ${process.env.NODE_ENV} mode on post ${PORT}`
    )
);
