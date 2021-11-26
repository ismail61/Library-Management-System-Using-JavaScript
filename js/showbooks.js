const showBooks = () => {
    let books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
    if (books) {
        let allBooks = document.getElementById('books')
        books.map(book => {
            let html = `
                <div class="col-xs-12 col-sm-6 col-md-4" style="width : 18rem">
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
                                Book Description
                            </p>
                            <div style="float : right;">
                                Written By : ${book.author}
                            </div>
                        </div>
                        <div class="footer mt-5">  
                            <div class="buy d-flex justify-content-between align-items-center">
                                <div>$ ${book.price}</div>
                                <div>
                                    <i title="Edit" onclick="Edit(${book.isbn})" class="far fa-edit m-1 text-success edit"></i>
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

    }
}
window.onload = showBooks()

//Edit a Book
const Edit = isbn => {
    console.log(isbn)
}
Edit();

//Delete a book
const Delete = isbn => {
    if (isbn) {
        if (confirm('Are you sure you want to delete this?')) {
            let books = JSON.parse(localStorage.getItem('books'))
            var newBooks = books.filter(book => {
                return book.isbn != isbn;
            })
            localStorage.removeItem('books')
            localStorage.setItem('books',JSON.stringify(newBooks))
            window.open('../LibaryManagementSystem/showbooks.html','_self')
        }
    }
}
Delete();