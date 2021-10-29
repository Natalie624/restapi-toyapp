/* Creating a simple endpoint */

const express = require('express'); // imports the express framework

const app = express(); //creates the express app
const port = 3000; // sets the port

//create a simple GET endpoint. When a user hits this endpoint the message "hello World, from express" will appear. 
// It is set to e on the homepage so the URL for the endpoint is /

app.get('/', (req, res) => {
    res.send('Hello World, from express');
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

