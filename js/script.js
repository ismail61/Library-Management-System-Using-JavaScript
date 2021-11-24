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
    try {
        e.preventDefault();
        let err = document.getElementById('alert')
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
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}
SignUp();


//Sign In
const SignIn = e => {
    e.preventDefault();
    let err = document.getElementById('alert')
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
            let ok = false
            for (let getUser of getUsers) {
                if (getUser.email === user.email && getUser.password === user.password) {
                    ok = true
                    break
                }
            }
            ok ? console.log("Successfully Sign In") : console.log("Invalid Credentials")
        }

    }
}

SignIn();