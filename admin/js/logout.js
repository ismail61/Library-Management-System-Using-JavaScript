const Logout = e =>{
    localStorage.removeItem('adminlogin')
    window.open('../admin/index.html','_self')
}