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
                let random = Math.floor(Math.random() * 1000000) + 1;
                let emailExits = false;
                let idMatch = false;
                if (users) {
                    users.map(exitsUser => {
                        if (exitsUser.email == user.email) {
                            emailExits = true;
                            return;
                        }else if(exitsUser.id == random){
                            idMatch = true;
                        }
                    })
                }
                if (!emailExits) {
                    if(idMatch){
                        random = Math.floor(Math.random() * 1000000) + 1;
                    }
                    Object.assign(user,{
                        id : random
                    })
                    //console.log(user)
                    users.push(user)
                    localStorage.setItem('users', JSON.stringify(users));
                    document.getElementById('name').value = ''
                    document.getElementById('email').value = ''
                    window.open('../user/signIn.html', '_self')
                }else{
                    errMsg(err, 'Email already exists')
                }
            }
        }
    } catch (error) {
        errMsg(err, 'Server Error')
    }
}
SignUp();