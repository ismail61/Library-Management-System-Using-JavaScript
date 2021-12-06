const inputHandler = e => {
    let orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
    let users = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []
    const filterOrders = orders.filter(order => {
        let filterUser = users.filter(user => {
            return user.id == order.userId
        })
        return (
            filterUser[0].name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
            filterUser[0].email.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
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

let admin = JSON.parse(localStorage.getItem('adminlogin'))


const showOrders = (filterOrders) => {
    try {
        let orders
        let tableBody = document.getElementById('table-body')
        if (!filterOrders) {
            orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
        } else {
            tableBody.innerHTML = ''
            orders = filterOrders
        }
        if (admin) {
            let html = '';
            if (orders) {
                let showOrders = []
                orders.map(order => {
                    if (order.bookId == admin.id) {
                        showOrders.push(order)
                    }
                })
                //console.log(showOrders);
                showOrders.map(order => {
                    let users = JSON.parse(localStorage.getItem('users'));
                    let orderedUser;
                    users.map(user => {
                        if (user.id == order.userId) {
                            orderedUser = user
                        }
                    })
                    //console.log(orderedUser)
                    let pending = `<div style="cursor : pointer; padding : 3px 5px;" title="Accept"
                                    onclick="Accept(${order.id})"
                                    class="btn mx-2 btn-success m-0 text-white ">
                                    <i class="fa fa-check"></i>
                                    </div>
                                    <div style="cursor : pointer; padding : 4px 8px;" title="Reject"
                                        onclick="Reject(${order.id})"
                                        class="btn mx-2 btn-danger m-0 text-white ">
                                        <i class="fa fa-close"></i>
                                    </div>`;
                    let accepted = `<div class="text-success">Accepted <i class="fas mx-2 fa-check"></i></div>`;
                    let rejected = `<div class="text-danger">Rejected <i class=" mx-3 fa fa-times" aria-hidden="true"></i></div>`
                    html += `
                        <tr class="cell">
                            <td data="Order #">#LMS-${order.id}</td>
                            <td data="Book Title">${order.title}</td>
                            <td data="Total">$${order.price}</td>
                            <td data="User Name">${orderedUser.name}</td>
                            <td data="User Email">${orderedUser.email}</td>
                            <td data="Accept/Reject" id="accept-reject">
                               ${(order.status == 'pending') ? pending : (order.status == 'accepted') ? accepted : rejected} 
                            </td >
                        </tr >`
                })
                tableBody.innerHTML = html
            } else {
                html = `
        < tr class="cell" >  
                            <td></td>
                            <td></td>
                            <td>Empty Order</td>
                            <td></td>
                            <td></td>
                        </tr >
        `
                tableBody.innerHTML = html
            }
        }
    } catch (error) {
        alert('Oops! Server Error')
    }
}
window.onload = showOrders()
function updateArray(key, idx, value) {
    var array = JSON.parse(localStorage.getItem(key));
    array[idx] = value;
    localStorage.setItem(key, JSON.stringify(array));
}

const Accept = (id) => {
    try {
        let orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
        let tableBody = document.getElementById('table-body')
        if (orders) {
            let ok = false;
            orders.map((order, index) => {
                if (order.id == id) {
                    order.status = 'accepted'
                    updateArray('orders', index, order)
                    ok = true;
                    return;
                }
            })
            if(ok){
                tableBody.innerHTML = ''
                showOrders()
            }else{
                alert('Sorry This order has been deleted for some reason')
                tableBody.innerHTML = ''
                showOrders()
            }
        }
    } catch (error) {
        alert('Oops! Server Error')
    }
}
const Reject = (id) => {
    try {
        let orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
        let tableBody = document.getElementById('table-body')
        if (orders) {
            orders.map((order, index) => {
                if (order.id == id) {
                    order.status = 'rejected'
                    updateArray('orders', index, order)
                    return;
                }
            })
            tableBody.innerHTML = ''
            showOrders()
        }
    } catch (error) {
        alert('Oops! Server Error')
    }
}