/*
* This is a book API that stores information about books - 
* ISBN number, title, author, published date, publisher and number of pages
* From tutorial: https://stackabuse.com/building-a-rest-api-with-node-and-express/
*/

const express = require('express'); //import express
//const bodyParser = require('body-parser'); 
// bodyParser is deprecated. express now comes with parsing ability in 'urlencoded' 
const cors = require('cors'); //cors is imported from 'cors'. It defines a way in which a browser and a server can interact to determine whether it is safe to allow the request. 


const app = express();
const port = 3000;

// Here we are simulating a database connection. This is where we will keep books. 
let books = [{
    "isbn": "9781593275846",
    "title": "The Sun Also Rises",
    "author": "Ernest Hemmingway",
    "publish_date": "1925-12-14",
    "publisher": "Penguin Press",
    "numOfPages": 300,
},
{
    "isbn": "9781449331818",
    "title": "A Mid Summer Nights Dream",
    "author": "William Shakespear",
    "publish_date": "1642-07-01",
    "publisher": "O'Reilly",
    "numOfPages": 254,
},
{
    "isbn": "9781449365035",
    "title": "Fire Starter",
    "author": "Steven King",
    "publish_date": "1979-02-01",
    "publisher": "O'Reilly",
    "numOfPages": 1065,
}];

app.use(cors());

// Configuring express.urlencoded by passing it the app.use method, which enables it as middleware to the express app instance.
// This middleware will be grabbing the HTTP body, decoding the information, and appending it to the req.body. 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/book', (req, res) => {
    const book = req.body;
    //output the book to the console for debugging
    console.log(book);
    //adding book to the book array
    books.push(book);

    res.send('Book is added to the database')
});

app.get('/books', (req, res) => {
    res.json(books);
});

/* Retrieving a book from the database (or the array in this example) is always done by a key specific to that entity. Each entity has a unique
* ID. In this case it is the ISBN number. This is typically done by parsing the URL parameter for an id and searching for a book with the cooresponding id.
* 
* Below we are using parametrized URLs. By adding a (:) to the path in the 'get' method paramter, we can define a variable mapped to the variabel isbn. ie; if a user visits 
* localhost:3000/book/5 the isbn parameter will be 5.
* You can accept more than one parameter in your URL if it makes sense in your scenario. For example /image/:width/:height, and then you 
* can get those parameters using req.params.width and req.params.height.
*/
app.get('/book/:isbn', (req, res) => {
    //parsing the URL parameter for an id - reading the isbn id from the URL
    const isbn = req.params.isbn

    //searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // Sending 404 when not found
    res.status(404).send('Book not found');
});

/* When deleting entities we typically delete them one by one to avoid big accidental loss. To delete we use the HTTP method DELETE and specifically
* look for ISBN number
*/
app.delete('/book/:isbn', (res, req) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;

    // remove item from the books array. We are using the array 'filter' method to filter out the book with the relevant ISBN to remove it from the array.
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });
    res.send('Book has been deleted')
})

app.post('/book/:isbn', (req, res) => {
    //reading isbn from the url
    const isbn = req.params.isbn;
    const newBook = req.body;

    //remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }
    res.send('Book is edited');
});


app.listen(port, () => console.log(`The Book app is listening on port ${port}!`));