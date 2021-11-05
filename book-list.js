/*The book-list.html template for displaying books, while this file is our client side/ browser-side logic for retrieving, updating / deleting books and displaying
* then on the page.
* In this script we are sending a GET request to the endpoint http://localhost:3000/books to retrieve books and then creating a Bootstrap card
* for every book to display it.
*
*/

const setEditModal = (isbn) => {
    //Get information about the book using isbn
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send;

    const book = JSON.parse(xhttp.responseText);

    const {
        title,
        author,
        publisher,
        publish_date,
        numOfPages,
    } = book;

    //filling information about the book in teh form inside th modal
    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value=author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;

    //setting up the URL for the book
    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

// Here we are sending the delete request when the button is pressed and reloading the page to display the changes
const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    //Reloading the page
    location.reload();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/books", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for(let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal"(${book.isbn})">
                            Edit
                            </button>
                        </div>
                    </div>
                </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();