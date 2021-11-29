const navbar = () => {

    const admin = JSON.parse(localStorage.getItem('adminlogin'))
    if (admin) {
        document.getElementById('signin').style.display = 'none';
        document.getElementById('signup').style.display = 'none';
        document.getElementById('home').style.display = 'none';
    }
}


navbar()