
const usersTable = document.querySelector('.user-table')
const userPage = document.querySelector('.user-page')
const url = 'http://localhost:8080/api/users'

const fetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
    findAllUsers: async () => await fetch('api/users'),
    findUserById: async (id) => await fetch(`api/users/${id}`),
    addNewUser: async (user) => await fetch('api/users',
        {method: 'POST', headers: fetchService.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`api/users/${id}`,
        {method: 'PUT', headers: fetchService.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`api/users/${id}`,
        {method: 'DELETE', headers: fetchService.head})
}

//заполнение модалок
function fillModal (user, modaltype) {

    document.getElementById(modaltype + "Id").value = user.id;
    document.getElementById(modaltype + "FirstName").value = user.firstName;
    document.getElementById(modaltype + "LastName").value = user.lastName;
    document.getElementById(modaltype + "Age").value = user.age;
    document.getElementById(modaltype + "Email").value = user.email;
    document.getElementById(modaltype + "Password").value = user.password;
    document.getElementById(modaltype + "Button").value = user.id;
}
//заполнение модалок
function findUserById (id, modaltype) {
    fetch(url+'/'+id)
        .then(res => res.json())
        .then(data => fillModal(data, modaltype));
}



// let allRoles = () => {
//     let roles = []
//     fetch('http://localhost:8080/api/roles')
//         .then(res => res.json())
//         .then(data => roles.push(data));
//     roles.forEach(role => console.log(role))
// }
// allRoles()

// user page
// let showUserPage = (user) => {
//     let output = '<tr>\n' +
//         '   <td th:text="${user.getId()}"></td>\n' +
//         '   <td th:text="${user.getFirstName()}"></td>\n' +
//         '   <td th:text="${user.getLastName()}"></td>\n' +
//         '   <td th:text="${user.getEmail()}"></td>\n' +
//         '   <td th:text="${user.getAge()}"></td>\n' +
//         '   <td th:text="${user.getRoles()}"></td>\n' +
//         '</tr>'
//     userPage.innerHTML = output;
// }
//
// function getUserPage (id) {
//     fetch(url+'/'+id)
//         .then(res => res.json())
//         .then(data => showUserPage(data));
// }
//
// getUserPage(this.value);

let renderUsers = (users) => {
    let output = ''
    users.forEach(user => {

        let roleOfUser = ''
        for (let a of user.roles) {
            roleOfUser += a.role.replace("ROLE_", "") + " "
        }
        // TODO добавить уникальный айди к каждой кнопке id="unique"
        // TODO почитать про addEventListener
        // TODO как вызвать модальное окно через jQuery
        output += `<tr>
                        <th scope="row">${user.id}</th>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${roleOfUser}</td>
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
$('#deleteButton').click( function (){
    deleteButton(this.value);
});
//вывод таблицы всех пользователей
function getUsers () {
    fetch(url)
        .then(res => res.json())
        .then(data => renderUsers(data));
}

getUsers();

function clearUsers () {
    $('.user-table').html("");
    // usersTable.
    getUsers();
}

function addUser () {
    let roles = [];

    let authorities = $('#addRole').val();
    authorities.forEach(roleId => {
        roles.push({id: roleId, role: roleId == 1 ? "ROLE_USER" : "ROLE_ADMIN"
        //roles = allRoles(by id)
            })})
    console.log(roles);

    let user = {
        firstName: $("#addFirstName").val().trim(),
        lastName: $("#addLastName").val().trim(),
        email: $("#addEmail").val().trim(),
        age: $("#addAge").val().trim(),
        password: $("#addPassword").val().trim(),
        roles: roles
    }
    console.log(user);

    // TODO preventDefault - отменяет дефолтное действие при нажатии
    // TODO
    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": 'application/json',
            'Referer': null
        },
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


// $('.openEditModal').click(
//     function () {
//         console.log('click start')
//         $('#userEditModal').modal('show');
//         findUserById(this.value, 'edit');
//         console.log('click end')
//     });


function deleteButton (id) {
    fetch(url+'/'+id, {
        method:'DELETE',
        headers: {
            'Accept': 'application/json',
            "Content-Type": 'application/json',
            'Referer': null
        }
    })
        .then(data => {
            console.log('Success:', data);
            $('#userDeleteModal').modal('hide')
            clearUsers();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function editUser (id) {

    fetch(url, {
        method:'PUT',
        headers: {
            'Accept': 'application/json',
            "Content-Type": 'application/json',
            'Referer': null
        }
    })
        .then(data => {
            console.log('Success:', data);
            $('#delete'+id).modal('hide')
            clearUsers();

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}