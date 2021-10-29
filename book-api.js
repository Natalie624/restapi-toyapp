/*
* This is a book API app that stores information about books - 
* ISBN number, title, author, published date, publisher and number of pages
*
*/

const express = require('express'); //import express
//const bodyParser = require('body-parser'); // bodyParser is deprecated. express now comes with parsing ability in urlencoded so using it via express only
const cors = require('cors');

const app = express();
const port = 3000;

//where we will keep books simulating a databse. 
let books = [];

app.use(cors());

// Configuring body parser middleware by passing it the app.use method, which enables it as middleware to the express app instance.
// The bodyParser middleware will be grabbing the HTTP body, decoding the information, and appending it to the req.body. 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/book', (req, res) => {
    const book = req.body;
    //output the book to the console for debugging
    console.log(book);
    //adding book to the book array
    books.push(book);

    res.send('Book is adde to the database')
});


app.listen(port, () => console.log(`The Book app listening on port ${port}!`));