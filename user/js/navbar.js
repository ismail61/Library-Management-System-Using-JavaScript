const navbar = () => {

    const user = JSON.parse(localStorage.getItem('userlogin'))
    if (user) {
        document.getElementById('signin').style.display = 'none';
        document.getElementById('signup').style.display = 'none';
        //document.getElementById('home')?document.getElementById('home').style.display = 'none';
    }
}


navbar()