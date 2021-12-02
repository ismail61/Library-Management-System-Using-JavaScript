const errMsg = (node, msg) => {
    if (msg && node) {
        node.innerText = msg
        setTimeout(() => {
            node.innerText = ''
        }, 4000)
    }
}

let admin = JSON.parse(localStorage.getItem('adminlogin'))


//Add Book
const addBook = async e => {
    let err = document.getElementById('alert')
    e.preventDefault();
    let book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        edition: document.getElementById('edition').value,
        isbn: document.getElementById('isbn').value,
        price: document.getElementById('price').value
    }
    let ok = true
    let books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
    if (books) {
        books.map(oldbook => {
            if (oldbook.isbn == book.isbn) {
                errMsg(err, 'ISBN Number must be Unique')
                ok = false
            }
        })
    }
    if (ok) {
        const imgPath = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // convert image file to base64 string and save to localStorage
            let books = new Array()
            books = JSON.parse(localStorage.getItem('books')) ? JSON.parse(localStorage.getItem('books')) : []
            let date = new Date();
            books.push({
                title: book.title,
                author: book.author,
                edition: book.edition,
                isbn: book.isbn,
                price: book.price,
                image: reader.result,
                bookId : admin.id   //Book Id Means Admin Id
                
            })
            //console.log(books)
            localStorage.setItem("books", JSON.stringify(books));
            document.getElementById('title').value = ''
            document.getElementById('author').value = ''
            document.getElementById('edition').value = ''
            document.getElementById('isbn').value = ''
            document.getElementById('coverimage').value = ''
            document.getElementById('price').value = ''
            document.getElementById('successful').innerHTML = 'New Book added Successful'
            setTimeout(() => {
                document.getElementById('successful').innerHTML = ''
            }, 2000)

        }, false);

        if (imgPath) {
            reader.readAsDataURL(imgPath);
        }

    }
}