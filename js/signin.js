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



//Sign In
const SignIn = e => {
    e.preventDefault();
    let err = document.getElementById('alert')
    try {
        let user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        if (user) {
            if (!validMail(user.email)) {
                errMsg(err, 'Please provide valid Email Address')
            } else if (user.password.length < 6) {
                errMsg(document.getElementById('alert'), 'Password must be 6 characters')
            } else {
                const getUsers = JSON.parse(localStorage.getItem('users'))
                if (!getUsers) {
                    errMsg(err, 'Please Sign Up First!')
                } else {
                    let ok = false
                    let loginUser = {}
                    for (let getUser of getUsers) {
                        if (getUser.email === user.email && getUser.password === user.password) {
                            ok = true
                            loginUser = getUser
                            break
                        }
                    }
                    if (ok) {
                        //console.log(loginUser)
                        Object.assign(loginUser, {
                            login: true
                        })

                        localStorage.setItem('Islogin', JSON.stringify(loginUser))
                        window.open('../LibaryManagementSystem/addbook.html', '_self')
                    } else {
                        errMsg(err, 'Invalid Credentials')
                    }
                }
            }
        }
    } catch (error) {
        errMsg(err, 'Server Error')
    }
}

SignIn();