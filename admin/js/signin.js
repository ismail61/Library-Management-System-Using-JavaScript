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
        let admin = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        if (admin) {
            if (!validMail(admin.email)) {
                errMsg(err, 'Please provide valid Email Address')
            } else if (admin.password.length < 6) {
                errMsg(document.getElementById('alert'), 'Password must be 6 characters')
            } else {
                const getAdmins = JSON.parse(localStorage.getItem('admins'))
                if (!getAdmins) {
                    errMsg(err, 'Please Sign Up First!')
                } else {
                    let ok = false
                    let loginAdmin = {}
                    for (let getAdmin of getAdmins) {
                        if (getAdmin.email === admin.email && getAdmin.password === admin.password) {
                            ok = true
                            loginAdmin = getAdmin
                            break
                        }
                    }
                    if (ok) {
                        localStorage.setItem('adminlogin', JSON.stringify(loginAdmin))
                        window.open('../admin/showbooks.html', '_self')
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