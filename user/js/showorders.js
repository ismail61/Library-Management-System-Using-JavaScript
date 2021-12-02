const inputHandler = e => {
    let orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
    const filterOrders = orders.filter(order => {
        return (
            order.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            order.id.toString().toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            order.author.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            order.price.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            order.status.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            order.isbn.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        )
    })
    if (filterOrders) {
        showOrders(filterOrders)
    }
}

let search = document.getElementById('search')
search.addEventListener('input', inputHandler)

let loginUser = JSON.parse(localStorage.getItem('userlogin'))


const showOrders = (filterOrders) => {
    let orders
    let tableBody = document.getElementById('table-body')
    if (!filterOrders) {
        orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
    } else {
        tableBody.innerHTML = ''
        orders = filterOrders
    }
    if (loginUser) {
        let html = '';
        if (orders) {
            let showOrders = []
            orders.map(order => {
                if (order.userId == loginUser.id) {
                    showOrders.push(order)
                }
            })
            //console.log(showOrders);
            showOrders.map(order => {
                html += `
                    <tr data-toggle="modal" data-target="#orderModal" style="cursor : pointer" onclick="singleOrderTrack(${order.id})" class="cell">  
                        <td data="Order #">#LMS-${order.id}</td>
                        <td data="Book Title">${order.title}</td>
                        <td data="Status"><span class="${order.status == 'rejected' ? 'text-danger' : 'text-success'}">${order.status[0].toUpperCase()}${order.status.slice(1)} ${(order.status == 'accepted' ? '<i class="fas mx-2 fa-check"></i>' : '<i class=" mx-3 fa fa-times" aria-hidden="true"></i>')}</span></td>
                        <td data="Total">$${order.price}</td>
                        <td data="Action"><div style="cursor : pointer; padding : 3px 5px;" title="Delete" onclick="Delete(${order.id})" 
                        class="btn btn-danger ${order.status != 'pending' ? 'disabled' : ''} m-0 text-white delete"><i class="fas fa-trash-alt"></i>
                        </div></td>
                    </tr>
                `

            })
            tableBody.innerHTML = html
        } else {
            html = `
                    <tr class="cell">  
                        <td></td>
                        <td></td>
                        <td>Empty Order</td>
                        <td></td>
                        <td></td>
                    </tr>
                `
            tableBody.innerHTML = html
        }
    }
}
window.onload = showOrders()


const Delete = (id) => {
    let orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
    if (orders) {
        let newOrders = orders.filter(order => {
            return order.id != id
        })
        localStorage.removeItem('orders')
        localStorage.setItem('orders', JSON.stringify(newOrders))
        showOrders()
    }
}

const singleOrderTrack = (id) => {
    let orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
    let singleOrder;
    if (orders) {
        singleOrder = orders.filter(order => {
            return order.id == id
        })
        //let singleOrder = newOrders.filter(order => {return order.isbn == isbn})
        //console.log(singleOrder[0])
    }
    if (singleOrder) {
        let modalBody = document.getElementById('modal-body')
        let html = `
                    <h6>Item Details</h6>
                    <div class="row">
                        <div class="col-md-3 col-sm-3 col-lg-3 col-xs-3"> <img class="img-fluid" src="${singleOrder[0].image}"> </div>
                        <div class="col-md-9 col-sm-9 col-lg-3 col-xs-3" style="padding-top: 2vh;">
                            <ul type="none">
                                <li style="${(singleOrder[0].title.length)<35?'white-space: nowrap':''}">Book Name : <b>${singleOrder[0].title}</b></li>
                                <li style="${(singleOrder[0].author.length)<35?'white-space: nowrap':''}">Author : <b>${singleOrder[0].author}</b></li>
                                <li>Edition : <b>${singleOrder[0].edition}</b></li>
                            </ul>
                        </div>
                    </div>
                    <h6>Order Details</h6>
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <ul type="none">
                                <li>Order number :</li>
                                <li>Date :</li>
                                <li>Price :</li>
                                <li>Tax :</li>
                                <li>Total Price :</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <ul type="none" style="font-weight:bold">
                                <li>#LMS-${singleOrder[0].id}</li>
                                <li>${singleOrder[0].date}</li>
                                <li>$${singleOrder[0].price}</li>
                                <li>$0</li>
                                <li>$${singleOrder[0].price}</li>
                            </ul>
                        </div>
                    </div>
                    <h6>Return Details</h6>
                    <div class="row" style="border-bottom: none">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <ul type="none">
                                <li class="left">Return Date :</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <ul type="none" style="font-weight:bold">
                                <li>25-12-2021</li>
                            </ul>
                        </div>
                    </div>
                `;
        modalBody.innerHTML = html
    }

}