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

const showBooks = (filterBook) => {
    let books
    if (!filterBook) {
        books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
    } else {
        let allBooks = document.getElementById('books')
        allBooks.innerHTML = ''
        books = filterBook
    }
    if (books) {
        let allBooks = document.getElementById('books')
        books.map(book => {
            let html = `
                <div class="col-xs-12 col-sm-6 col-md-4">
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
                                    <span id="order" title="Order Now" onclick="Order(${book.isbn})" class="btn btn-success order">Order Request</span> 
                                </div>
                            </div>       
                        </div>
                    </div>
                </div>
            `
            allBooks.innerHTML += html
        })
    } else {
        let allBooks = document.getElementById('books')
        let html = `<div>Empty Books . Please add a book write now</div>`
        allBooks.innerHTML = html
    }
}
window.onload = showBooks()

