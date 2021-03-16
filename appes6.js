class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
  
    //Create tr element
    const row = document.createElement('tr');
    
    //Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
  
    list.appendChild(row);
  }

  showAlert(message, className) {
    //Construct the element
    const div = document.createElement('div');
  
    //Add classes
    div.className = `alert ${className}`;
  
    //Add text
    div.appendChild(document.createTextNode(message));
  
    //Get parent
    const container = document.querySelector('.container');
  
    //Get form
    const form = document.querySelector('#book-form');
  
    //Insert alert
    container.insertBefore(div, form);
  
    //Clear after some seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local storage Class
class Store {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;
      
      //Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static removeBook() {

  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit',
  function(e) {
    //Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    //Instantiate book      
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validation
    if(title === '' || author === '' || isbn == '') {
      //Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      //Add book to list
      ui.addBookToList(book);

      //Add to LocalStorage
      Store.addBook(book);

      //Show success
      ui.showAlert('Book added', 'success');

      //Clear fields
      ui.clearFields();
    }

    e.preventDefault();
})

//Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){
  
  //Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert('Book removed!', 'success');
  
  e.preventDefault();
});