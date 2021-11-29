
//Password Update

const EditPassword = () => {
    try {
        let admin = JSON.parse(localStorage.getItem('adminlogin'))
        if (admin) {
            let modalBody = document.getElementById('modal-body')
            let html = `
                <form role="form" style="margin-top: 2px;" onsubmit="UpdatePassword(event)">
                    <center>
                        <strong id="alert"  style="color: rgb(95, 5, 5);"></strong>
                    </center>
                    <div class="row px-3">
                        <label class="mb-1">
                            <h6 class="mb-0 text-sm">Current Password</h6>
                        </label>
                        <input id="oldpassword" placeholder="Enter your current password" class="mb-4" type="password" name="oldpassword"
                            required>
                    </div>
                    <div class="row px-3">
                        <label class="mb-1">
                            <h6 class="mb-0 text-sm">New Password</h6>
                        </label>
                        <input id="newpassword" placeholder="Enter new password"  class="mb-4" type="password" name="newpassword"
                            required >
                    </div>
                   
                    <center>
                        <div class="row btn mb-3 px-3">
                            <button type="submit" id="update" class="btn btn-blue text-center">Update Password</button>
                        </div>
                    </center>
                </form>
            `;
            modalBody.innerHTML = html
        }
    } catch (error) {
        console.log(error)
    }
}

EditPassword();
const UpdatePassword = (e) => {
    let err = document.getElementById('alert')
    e.preventDefault();
    let passwordObj = {
        oldpassword: document.getElementById('oldpassword').value,
        newpassword: document.getElementById('newpassword').value
    }
    if (passwordObj.newpassword.length < 6) {
        errMsg(err, 'Password must be 6 character')
    }
    else {
        let loginAdmin = JSON.parse(localStorage.getItem('adminlogin'))
        if (loginAdmin) {
            if (loginAdmin.password == passwordObj.oldpassword) {
                let admins = JSON.parse(localStorage.getItem('admins'))
                admins.map((admin, index) => {
                    if (admin.password == loginAdmin.password) {
                        updateArray('admins', index, {
                            name: loginAdmin.name,
                            email: loginAdmin.email,
                            password: passwordObj.newpassword,
                            description: loginAdmin.description?loginAdmin.description:'',
                            image: loginAdmin.image?loginAdmin.image:null
                        })
                        localStorage.removeItem('adminlogin')
                        window.open('../admin/index.html','_self')
                    }
                })
            } else {
                errMsg(err, 'Current password does not match')
            }
        }
    }
}
UpdatePassword();
