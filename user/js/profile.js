const myAccount = () => {
    let user = JSON.parse(localStorage.getItem('userlogin'))
    if (user) {
        let profile = document.getElementById('profile')
        let html = `
            <div class="myprofile mt-2">
                <div class="profile-pic">
                    <div class="header-color"></div>
                    <img src="${user.image?user.image:'./img/ismail.jpg'}" alt="Profile Picture">
                </div>
                <div class="mt-2">
                    <h1 class="name">Name : ${user.name}</h1>
                    <h2 class="email">Email : ${user.email}</h2>
                </div>
                <div class="description mt-2">
                    ${user.description?user.description:'<p>Best friend of ******</p><p>Can not get drunk</p>'}
                </div>
                <span class="text-primary">To show your Picture Please click Edit My Account</span>
                <button onclick="EditProfile()" data-toggle="modal" data-target="#myModal1" class="btn mt-3 mx-2 btn-blue">Edit My Account</button>
                <button onclick="EditPassword()" data-toggle="modal" data-target="#myModal1" class="btn mt-3 mx-2 btn-blue">Change Possword</button>                
            </div>
        `
        profile.innerHTML = html
    }
}

window.onload = myAccount()


//Edit Profile
const EditProfile = () => {
    try {
        let user = JSON.parse(localStorage.getItem('userlogin'))
        if (user) {
            let modalBody = document.getElementById('modal-body')
            let html = `
                <form role="form" style="margin-top: 2px;" onsubmit="UpdateInfo(event)">
                    <div class="row px-3">
                        <label class="mb-1">
                            <h6 class="mb-0 text-sm">Name</h6>
                        </label>
                        <input id="name" value="${user.name}" class="mb-4" type="text" name="name"
                            required>
                    </div>
                    <div class="row px-3">
                        <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email</h6>
                        </label>
                        <input id="email" value="${user.email}" class="mb-4" type="text" name="email"
                            disabled>
                    </div>
                    <div class="row px-3">
                        <label class="mb-1 d-flex justify-content-between">
                            <h6 class="mb-0 text-sm">Description</h6> 
                            <h6 class="mb-0 text-sm" id="count"></h6>
                        </label>
                        <textarea id="description" name="text"maxlength="150">${user.description?user.description:''}</textarea>
                    </div>
                    <div class="row px-3">
                        <label class="mb-1">
                            <h6 class="mb-0 text-sm">Image</h6>
                        </label>
                        <input id="image" type="file" name="image" >
                    </div>
                    <img height="50px" width="50px" class="img-fluid ml-5" src="${user.image?user.image:'./img/ismail.jpg'}" alt="Profile">
                    <center>
                        <div class="row btn mb-3 px-3">
                            <button type="submit" id="update" class="btn btn-blue text-center">Update Now</button>
                        </div>
                    </center>
                </form>
            `;
            modalBody.innerHTML = html
            var description = document.getElementById('description');
            var length = description.getAttribute("maxlength");
            var cnt = document.getElementById('count');
            cnt.innerHTML = `max length : ${length}`;
            description.onkeyup = function () {
                cnt.innerHTML = `${(length - this.value.length)}/${length}`;
            };
        }
    } catch (error) {
        console.log(error)
    }
}
EditProfile();


//Update an array object
function updateArray(key, idx, value) {
    var array = JSON.parse(localStorage.getItem(key));
    array[idx] = value;
    localStorage.setItem(key, JSON.stringify(array));
}
const UpdateInfo = e => {
    e.preventDefault()
    let updateUser = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        description: document.getElementById('description').value ? document.getElementById('description').value : '',
        image: document.querySelector('input[type=file]').files[0]
    }
    if (updateUser.image) {

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // convert image file to base64 string and save to localStorage
            let users = JSON.parse(localStorage.getItem('users'))
            users.map((user, index) => {
                if (user.email == updateUser.email) {
                    updateArray('users', index, {
                        name: updateUser.name,
                        email: user.email,
                        password: user.password,
                        description: updateUser.description,
                        image: reader.result
                    })
                    localStorage.removeItem('userlogin')
                    localStorage.setItem('userlogin', JSON.stringify({
                        name: updateUser.name,
                        email: user.email,
                        password: user.password,
                        description: updateUser.description,
                        image: reader.result
                    }))
                    return;
                }
            })
        }, false);
        reader.readAsDataURL(updateUser.image);
    } else {
        let users = JSON.parse(localStorage.getItem('users'))
        users.map((user, index) => {
            if (user.email == updateUser.email) {
                updateArray('users', index, {
                    name: updateUser.name,
                    email: user.email,
                    password: user.password,
                    description: updateUser.description
                })
                localStorage.removeItem('userlogin')
                localStorage.setItem('userlogin', JSON.stringify({
                    name: updateUser.name,
                    email: user.email,
                    password: user.password,
                    description: updateUser.description
                }))
                return;
            }
        })
    }
    let showProfile = document.getElementById('profile')
    showProfile.innerHTML = ''
    myAccount()
    document.getElementById('update').setAttribute('data-dismiss', 'modal')
}
UpdateInfo();


//Password Update

const EditPassword = () => {
    try {
        let user = JSON.parse(localStorage.getItem('userlogin'))
        if (user) {
            let modalBody = document.getElementById('modal-body')
            let html = `
                <form role="form" style="margin-top: 2px;" onsubmit="UpdateInfo(event)">
                    <div class="row px-3">
                        <label class="mb-1">
                            <h6 class="mb-0 text-sm">Name</h6>
                        </label>
                        <input id="name" value="${user.name}" class="mb-4" type="text" name="name"
                            required>
                    </div>
                    <div class="row px-3">
                        <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email</h6>
                        </label>
                        <input id="email" value="${user.email}" class="mb-4" type="text" name="email"
                            disabled>
                    </div>
                   
                    <center>
                        <div class="row btn mb-3 px-3">
                            <button type="submit" id="update" class="btn btn-blue text-center">Update Now</button>
                        </div>
                    </center>
                </form>
            `;
            modalBody.innerHTML = html
            var description = document.getElementById('description');
            var length = description.getAttribute("maxlength");
            var cnt = document.getElementById('count');
            cnt.innerHTML = `max length : ${length}`;
            description.onkeyup = function () {
                cnt.innerHTML = `${(length - this.value.length)}/${length}`;
            };
        }
    } catch (error) {
        console.log(error)
    }
}
EditPassword();