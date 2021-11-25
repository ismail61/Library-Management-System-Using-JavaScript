//Email Validation
const validMail = (mail) => {
    return (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(mail)) ? true : false
}

const errMsg = (node, msg) => {
    if (msg && node) {
        node.innerText = msg
        setTimeout(() => {
            node.innerText = ''
        }, 2000)
    }
}

//Sign Up

const SignUp = e => {
    e.preventDefault();
    let err = document.getElementById('alert')
    try {
        let user = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        if (user) {
            if (user.name.length < 6) {
                errMsg(err, 'Name must be 6 characters')
            } else if (user.password.length < 6) {
                errMsg(err, 'Password must be 6 characters')
            } else if (!validMail(user.email)) {
                errMsg(err, 'Please provide valid Email Address')
            } else {
                let users = new Array()
                users = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []
                users.push(user)
                localStorage.setItem('users', JSON.stringify(users));
                window.open('../LibaryManagementSystem/signIn.html', '_self')
            }
        }
    } catch (error) {
        errMsg(err, 'Server Error')
    }
}
SignUp();