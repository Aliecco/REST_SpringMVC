
const usersTable = document.querySelector('.user-table')
const url = 'http://localhost:8080/api/users'

const header = {
    'Accept': 'application/json',
    "Content-Type": 'application/json',
    'Referer': null
}

let renderUsers = (users) => {
    let output = ''
    users.forEach(user => {

        let roleOfUser = ''
        for (let a of user.roles) {
            roleOfUser += a.role.replace("ROLE_", "") + " "
        }
        output += `<tr id="${user.id}">
                        <th scope="row">${user.id}</th>
                        <td class="firstNameRow">${user.firstName}</td>
                        <td class="lastNameRow">${user.lastName}</td>
                        <td class="ageRow">${user.age}</td>
                        <td class="emailRow">${user.email}</td>
                        <td class="roleRow">${roleOfUser}</td>
                        <td>
                            <button type="button" class="btn btn-info openEditModal" 
                                data-toggle="modal" value="${user.id}">Edit</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger openDeleteModal"
                                data-toggle="modal" value="${user.id}">Delete</button>
                        </td>
                    </tr>`;
    });
    usersTable.innerHTML = output;
    $('.openEditModal').click(
        function () {
            console.log('click start')
            $('#userEditModal').modal('show');
            findUserById(this.value, 'edit');
            console.log('click end')
        });
    $('.openDeleteModal').click(
        function () {
            $('#userDeleteModal').modal('show');
            findUserById(this.value, 'delete');

        });
}

//вывод таблицы всех пользователей
function getUsers () {
    fetch(url)
        .then(res => res.json())
        .then(data => renderUsers(data));
}

getUsers();

function updateRow(user) {
    let roleOfUser = ''
    for (let a of user.roles) {
        roleOfUser += a.role.replace("ROLE_", "") + " "
    }
    $("tr#"+user.id+" .firstNameRow").text(user.firstName);
    $("tr#"+user.id+" .lastNameRow").text(user.lastName);
    $("tr#"+user.id+" .ageRow").text(user.age);
    $("tr#"+user.id+" .emailRow").text(user.email);
    $("tr#"+user.id+" .roleRow").text(roleOfUser);
}

function deleteRow(id) {
    $('tr#'+id).html("");
}

// function addRow(user) {
//     let output;
//     let roleOfUser = '';
//     for (let a of user.roles) {
//         roleOfUser += a.role.replace("ROLE_", "") + " "
//     }
//     output += `<tr id="${user.id}">
//                         <th scope="row">${user.id}</th>
//                         <td class="firstNameRow">${user.firstName}</td>
//                         <td class="lastNameRow">${user.lastName}</td>
//                         <td class="ageRow">${user.age}</td>
//                         <td class="emailRow">${user.email}</td>
//                         <td class="roleRow">${roleOfUser}</td>
//                         <td>
//                             <button type="button" class="btn btn-info openEditModal"
//                                 data-toggle="modal" value="${user.id}">Edit</button>
//                         </td>
//                         <td>
//                             <button type="button" class="btn btn-danger openDeleteModal"
//                                 data-toggle="modal" value="${user.id}">Delete</button>
//                         </td>
//                     </tr>`;
//     usersTable.append(output);
//
// }

function clearUsers () {
    $('.user-table').html("");
    // usersTable.
    getUsers();
}

//заполнение модалок
function fillModal (user, modaltype) {

    //TODO switch to jQuery
    document.getElementById(modaltype + "Id").value = user.id;
    document.getElementById(modaltype + "FirstName").value = user.firstName;
    document.getElementById(modaltype + "LastName").value = user.lastName;
    document.getElementById(modaltype + "Age").value = user.age;
    document.getElementById(modaltype + "Email").value = user.email;
    // document.getElementById(modaltype + "Password").value = user.password;
    document.getElementById(modaltype + "Button").value = user.id;
}

function findUserById (id, modaltype) {
    fetch(url+'/'+id)
        .then(res => res.json())
        .then(data => fillModal(data, modaltype));
}

function editUser() {
    let roles = [];

    let authorities = $('#editRoles').val();
    authorities.forEach(roleId => {
        roles.push({id: roleId, role: roleId == 1 ? "ROLE_USER" : "ROLE_ADMIN"})
    })
    console.log(roles);

    let user = {
        id: $("#editId").val().trim(),
        firstName: $("#editFirstName").val().trim(),
        lastName: $("#editLastName").val().trim(),
        email: $("#editEmail").val().trim(),
        age: $("#editAge").val().trim(),
        password: $("#editPassword").val().trim(),
        roles: roles
    }

    fetch(url, {
        method:'PUT',
        headers: header,
        body: JSON.stringify(user)
    })
        .then(data => {

            console.log('Success:', data);
            updateRow(user);
            $('#userEditModal').modal('hide')
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function addUser () {
    let roles = [];

    let authorities = $('#addRole').val();
    authorities.forEach(roleId => {
        roles.push({id: roleId, role: roleId == 1 ? "ROLE_USER" : "ROLE_ADMIN"
            })
    })
    console.log(roles);

    let user = {
        firstName: $("#addFirstName").val().trim(),
        lastName: $("#addLastName").val().trim(),
        email: $("#addEmail").val().trim(),
        age: $("#addAge").val().trim(),
        password: $("#addPassword").val().trim(),
        roles: roles
    }

    fetch(url, {
        method:'POST',
        headers: header,
        body: JSON.stringify(user)
    })
        .then(data => {
            console.log('Success:', data);
            clearUsers();
            document.getElementById('nav-users-tab').click();
        })
        .catch((error) => {
            console.error('Error:', error);
        });


}

function deleteButton (id) {
    fetch(url+'/'+id, {
        method:'DELETE',
        headers: header
    })
        .then(data => {
            console.log('Success:', data);
            $('#userDeleteModal').modal('hide')
            deleteRow(id);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

$('#addUserButton').click(function () {addUser()});

$('#editButton').click(function () {editUser()});

$('#deleteButton').click( function (){
    deleteButton(this.value);
});