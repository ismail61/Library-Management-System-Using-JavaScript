//Sign Up

const SignUp = e => {
    try {
        e.preventDefault();
        let user = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        if(user){
            console.log(user)
            //localStorage.setItem('user', JSON.stringify(user));
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
    if(user){
        const getUser = JSON.parse(localStorage.getItem('user'))
        if(getUser.email === user.email && getUser.password === user.password){
            console.log("Successfully Sign In")
        }else{
            console.log('Invalid Credentials')
        }
    }
}

SignIn();