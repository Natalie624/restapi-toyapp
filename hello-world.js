/* Creating a simple endpoint */

const express = require('express'); // imports the express framework

const app = express(); //creates the express app
const port = 3000; // sets the port

//create a simple GET endpoint. 
app.get('/', (req, res) => { //set the URL endpoint. Here it's set to the homepage.
    res.send('Hello World, from express'); //When a user hits this endpoint the message "hello World, from express" will appear. 
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

