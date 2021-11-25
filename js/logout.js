const Logout = e =>{
    localStorage.removeItem('Islogin')
    window.open('../LibaryManagementSystem/index.html','_self')
}