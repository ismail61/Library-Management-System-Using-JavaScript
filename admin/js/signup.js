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
        let admin = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        if (admin) {
            if (admin.name.length < 6) {
                errMsg(err, 'Name must be 6 characters')
            } else if (admin.password.length < 6) {
                errMsg(err, 'Password must be 6 characters')
            } else if (!validMail(admin.email)) {
                errMsg(err, 'Please provide valid Email Address')
            } else {
                let admins = new Array()
                admins = JSON.parse(localStorage.getItem('admins')) ? JSON.parse(localStorage.getItem('admins')) : []
                let random = Math.floor(Math.random() * 1000000) + 1;
                let emailExits = false;
                let idMatch = false;
                if (admins) {
                    admins.map(exitsAdmin => {
                        if (exitsAdmin.email == admin.email) {
                            emailExits = true;
                            return;
                        }else if(exitsAdmin.id == random){
                            idMatch = true;
                        }
                    })
                }
                if (!emailExits) {
                    if(idMatch){
                        random = Math.floor(Math.random() * 1000000) + 1;
                    }
                    Object.assign(admin,{
                        id : random
                    })
                    admins.push(admin)
                    localStorage.setItem('admins', JSON.stringify(admins));
                    document.getElementById('name').value = ''
                    document.getElementById('email').value = ''
                    window.open('../admin/signIn.html', '_self')
                } else {
                    errMsg(err, 'Email already exists')
                }

            }
        }
    } catch (error) {
        console.log(error.message)
        errMsg(err, 'Server Error')
    }
}
SignUp();