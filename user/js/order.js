const Order = (isbn) =>{
    
    let books = JSON.parse(localStorage.getItem('books'))
    let orderBook 
    books.map(book => {
        if(book.isbn == isbn){
            orderBook = book
            return;
        }
    })
    let random = Math.floor(Math.random() * 1000000) + 1;
    let user = JSON.parse(localStorage.getItem('userlogin'))
    let orders = JSON.parse(localStorage.getItem('orders'))?JSON.parse(localStorage.getItem('orders')):[]
    let idMatch = false;
    if (orders) {
        orders.map(order => {
            if (order.id == random) {
                idMatch = true;
                return;
            }
        })
    }
    if(idMatch){
        random = Math.floor(Math.random() * 1000000) + 1;
    }
    let date = new Date()
    Object.assign(orderBook,{
        id : random,
        userId : user.id,
        status : 'pending',
        date : `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    })
    //console.log(orderBook)
    orders.push(orderBook);
    localStorage.setItem("orders",JSON.stringify(orders))
    alert("New Order Placed Successful\nThanks for your order")
    
}