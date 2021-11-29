let loginUser = JSON.parse(localStorage.getItem('userlogin'))


const showOrders = (user) => {
    if (user) {
        let orders = JSON.parse(localStorage.getItem('orders'))?JSON.parse(localStorage.getItem('orders')):[]
        let tableBody = document.getElementById('table-body')
        let html = '';
        if (orders) {
            let showOrders = []
            orders.map(order => {
                if (order.userId == user.id) {
                    showOrders.push(order)
                }
            })
            //console.log(showOrders);
            showOrders.map(order => {
                html += `
                    <tr class="cell">  
                        <td>#LMS-13487</td>
                        <td>${order.title}</td>
                        <td><span class="badge ${order.status=='rejected'?'text-danger':'text-success'}">${order.status}</span></td>
                        <td>$${order.price}</td>
                        <td><div style="cursor : pointer; padding : 3px 5px;" title="Delete" onclick="Delete(${order.id})" 
                        class="btn btn-danger ${order.status!='pending'?'disabled':''} m-0 text-white delete"><i class="fas fa-trash-alt"></i>
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
window.onload = showOrders(loginUser)


const Delete = (id) =>{
    let orders = JSON.parse(localStorage.getItem('orders'))?JSON.parse(localStorage.getItem('orders')):[]
    if(orders){
        let newOrders = orders.filter(order => {
            return order.id!=id
        })
        localStorage.removeItem('orders')
        localStorage.setItem('orders',JSON.stringify(newOrders))
        showOrders(loginUser)
    }
}