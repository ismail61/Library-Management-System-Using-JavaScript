(function () {
    let books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
    if (books) {
        let allBooks = document.getElementById('books')
        books.map(book => {
            let html = `
                <div class="col-xs-12 col-sm-6 col-md-4" style="width : 19rem">
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
                                    <i title="Edit" class="far fa-edit m-1 text-success edit"></i>
                                    <i title="Delete" class="fas fa-trash-alt m-1 text-danger delete"></i>
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
})();

