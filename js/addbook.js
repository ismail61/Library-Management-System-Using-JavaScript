
//Add Book
const addBook = async e => {
    e.preventDefault();
    let book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value,
    }
    const imgPath = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // convert image file to base64 string and save to localStorage
        let books = new Array()
        books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
        books.push({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            image: reader.result
        })
        localStorage.setItem("books", JSON.stringify(books));
    }, false);

    if (imgPath) {
        reader.readAsDataURL(imgPath);
    }

}

