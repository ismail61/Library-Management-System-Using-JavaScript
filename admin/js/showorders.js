let loginAdmin = JSON.parse(localStorage.getItem('adminlogin'))


const showOrders = (admin) => {
    try {
        if (admin) {
            let orders = JSON.parse(localStorage.getItem('orders')) ? JSON.parse(localStorage.getItem('orders')) : []
            let tableBody = document.getElementById('table-body')
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
                    let accepted = `<div class="text-success">Accepted</div>`;
                    let rejected = `<div class="text-danger">Rejected</div>`
                    html += `
                        <tr class="cell">
                            <td>#LMS-13487</td>
                            <td>${order.title}</td>
                            <td>$${order.price}</td>
                            <td>${orderedUser.name}</td>
                            <td>${orderedUser.email}</td>
                            <td id="accept-reject">
                               ${(order.status == 'pending') ? pending : (order.status == 'accepted') ? accepted : rejected} 
                            </td >
                        </tr >
        `

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
window.onload = showOrders(loginAdmin)
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
            orders.map((order, index) => {
                if (order.id == id) {
                    order.status = 'accepted'
                    updateArray('orders', index, order)
                    return;
                }
            })
            tableBody.innerHTML = ''
            showOrders(loginAdmin)
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
            showOrders(loginAdmin)
        }
    } catch (error) {
        alert('Oops! Server Error')
    }
}