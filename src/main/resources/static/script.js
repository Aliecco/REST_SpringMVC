const usersTable = document.querySelector('.user-table');
const url = 'http://localhost:8080/api/users';
let output = '';


let allRoles = () => {
    let roles = [];
    fetch('http://localhost:8080/api/roles')
        .then(res => res.json())
        .then(data => roles.push(data));
    roles.forEach(role => console.log(role));
}
allRoles();

let renderUsers = (users) => {
    users.forEach(user => {
        let roleOfUser = '';
        for (let a of user.roles) {
            roleOfUser += a.role.replace("ROLE_", "") + " ";
        }
        output += `<tr>
                        <th scope="row">${user.id}</th>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${roleOfUser}</td>
                        <td>
                            <!--TODO добавить уникальный айди к каждой кнопкеid="unique",-->
<!--                            TODO почитать про addEventListener-->
<!--                            TODO как вызвать модальное окно через jQuery-->
                            <button th:href="${'#edit' + user.id}" type="button" class="btn btn-info"
                                data-toggle="modal" value="${user.id}">Edit</button>
                        </td>
                        <td>

                            <button th:href="${'#delete' + user.id}" type="button" class="btn btn-danger"
                                 data-toggle="modal" value="${user.id}">Delete</button>
                        </td>
                    </tr>`;
    });
    usersTable.innerHTML = output;
}
//вывод таблицы всех пользователей
function getUsers () {
    fetch(url)
        .then(res => res.json())
        .then(data => renderUsers(data));
    console.log('getUsers works')
}

getUsers();

function clearUsers () {
    $("#usersList").html("");
    console.log('CLEAR TABLE')
    getUsers();
}

function addUser () {
    console.log('addUser started')
    let roles = allRoles();


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
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}