//Sign Up

const SignUp = e => {
    try {
        e.preventDefault();
        let user = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        if (user) {
            let users = new Array()
            users = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : []
            users.push(user)
            localStorage.setItem('users', JSON.stringify(users));

        }
    } catch (error) {
        console.log(error.message)
    }
}
SignUp();


//Sign In
const SignIn = e => {
    e.preventDefault();
    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    if (user) {
        const getUsers = JSON.parse(localStorage.getItem('users'))
        let ok = false
        for (let getUser of getUsers) {
            if (getUser.email === user.email && getUser.password === user.password) {
                ok = true
                break
            } 
        }
        ok?console.log("Successfully Sign In"):console.log("Invalid Credentials")
    }
}

SignIn();