// create an express app

const express = require('express');
const app = express();


// create a home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});