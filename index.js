// create an express app

const express = require('express');
const app = express();


// create a home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// create a route for /about
app.get('/about', (req, res) => {
    res.send('About Page');
});

// create a route for /contact
app.get('/contact', (req, res) => {
    res.send('Contact Page');
});


// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});