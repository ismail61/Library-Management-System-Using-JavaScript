const inputHandler = e => {
    let books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
    const filterBook = books.filter(book => {
        return (
            book.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            book.author.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            book.price.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            book.isbn.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        )
    })
    if (filterBook) {
        showBooks(filterBook)
    }
}

let search = document.getElementById('search')
search.addEventListener('input', inputHandler)
//search.addEventListener('propertychange', inputHandler); // for IE8
// Firefox/Edge18-/IE9+ don’t fire on <select><option>
//search.addEventListener('change', inputHandler); 

let admin = JSON.parse(localStorage.getItem('adminlogin'))

const showBooks = (filterBook) => {
    let books
    let allBooks = document.getElementById('books')
    if (!filterBook) {
        books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
    } else { 
        allBooks.innerHTML = ''
        books = filterBook
    }
    if (books) {
        let showBooks = []
        books.map(book => {
            if (book.bookId == admin.id) {
                showBooks.push(book)
            }
        })
        showBooks.map(book => {
            let html = `
                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="card">
                        <a class="img-card" href="">
                            <img
                                src="${book.image}" />
                        </a>
                        <div class="card-content">
                            <h4 class="card-title">
                                <a href="">
                                    ${book.title}
                                </a>
                            </h4>
                            <p>
                                Edition : <b>${book.edition}</b>
                            </p>
                            <div style="float : right;">
                                Written By : ${book.author}
                            </div>
                        </div>
                        <div class="footer mt-5">  
                            <div class="buy d-flex justify-content-between align-items-center">
                                <div>$ ${book.price}</div>
                                <div>
                                    <i data-toggle="modal" data-target="#myModal" title="Edit" onclick="Edit(${book.isbn})" class="far fa-edit m-1 text-success edit"></i>
                                    <i title="Delete" onclick="Delete(${book.isbn})" class="fas fa-trash-alt m-1 text-danger delete"></i>
                                </div>
                            </div>       
                        </div>
                    </div>
                </div>
            `
            allBooks.innerHTML += html
        })
    } else {
        let html = `<div>Empty Books . Please add a book now</div>`
        allBooks.innerHTML = html
    }
}
window.onload = showBooks()

//Edit a Book
const Edit = isbn => {
    if (isbn) {
        let books = JSON.parse(localStorage.getItem('books'))
        if (books) {
            var editbook = books.filter(book => {
                return book.isbn == isbn;
            })
            //console.log(editbook[0])
            let modalBody = document.getElementById('modal-body')
            let html = `
                <form role="form" onsubmit="Update(event)">
                    <table border="2" align="center" cellpadding="5" cellspacing="5">
                        <tr>
                            <td>ISBN</td>
                            <td>
                                <input placeholder="Enter ISBN" value="${editbook[0].isbn}" id="isbn" type="text" name="isbn" size="48" disabled />
                            </td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>
                                <input placeholder="Enter Title" value="${editbook[0].title}" id="title" type="text" name="title" size="48" required />
                            </td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>
                                <input placeholder="Enter Author" value="${editbook[0].author}" id="author" type="text" name="author" size="48" required />
                            </td>
                        </tr>
                        <tr>
                            <td>Edition</td>
                            <td>
                                <input placeholder="Enter Edition" value="${editbook[0].edition}" id="edition" type="text" name="edition" size="48" required />
                            </td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>
                                <input id="price" value="${editbook[0].price}" placeholder="Enter Price" type="number" name="price" size="48" required />
                            </td>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td>
                                <input value="image" id="coverimage" accept=".jpg, .jpeg, .png, .giff" type="file"
                                    name="coverimage" size="48" />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <img height="50px" width="50px" class="img-fluid ml-5" src="${editbook[0].image}" alt="something.png">
                            </td>
                        </tr>
                        
                    </table>
                    <div class="mt-2 updateBtn" style="float : right; margin-right: 18px">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button id="update" type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
                
            `;
            modalBody.innerHTML = html
        }
    }
}
Edit();

//Delete a book
const Delete = isbn => {
    if (isbn) {
        if (confirm('Are you sure you want to delete this?')) {
            let books = JSON.parse(localStorage.getItem('books'))
            if (books) {
                var newBooks = books.filter(book => {
                    return book.isbn != isbn;
                })
                localStorage.removeItem('books')
                localStorage.setItem('books', JSON.stringify(newBooks))
                let allBooks = document.getElementById('books')
                allBooks.innerHTML = ''
                showBooks()
            }
        }
    }
}
Delete();


function updateArray(key, idx, value) {
    var array = JSON.parse(localStorage.getItem(key));
    array[idx] = value;
    localStorage.setItem(key, JSON.stringify(array));
}
const Update = e => {
    e.preventDefault()
    let updateBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        edition: document.getElementById('edition').value,
        isbn: document.getElementById('isbn').value,
        price: document.getElementById('price').value,
        image: document.querySelector('input[type=file]').files[0],
        bookId : admin.id
    }
    if (updateBook.image) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // convert image file to base64 string and save to localStorage
            let books = JSON.parse(localStorage.getItem('books'))
            books.map((book, index) => {
                if (book.isbn == updateBook.isbn) {
                    updateBook.image = reader.result
                    updateArray('books', index, updateBook)
                    return;
                }
            })
        }, false);
        reader.readAsDataURL(updateBook.image);
    } else {
        let books = JSON.parse(localStorage.getItem('books'))
        books.map((book, index) => {
            if (book.isbn == updateBook.isbn) {
                updateBook.image = book.image;
                //console.log(updateBook);
                updateArray('books', index, updateBook)
                return;
            }
        })
    }
    let allBooks = document.getElementById('books')
    allBooks.innerHTML = ''
    showBooks()
    document.getElementById('update').setAttribute('data-dismiss', 'modal')
}
Update();