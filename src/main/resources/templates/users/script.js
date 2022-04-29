
const usersTable = document.querySelector('.user-table');
const url = 'http://localhost:8080/api/users';
let output = '';

let renderUsers = (users) => {
    users.forEach(user => {
        output += `<tr>
                        <th scope="row">${user.getId}</th>
                        <td>${user.getFirstName()}</td>
                        <td>${user.getLastName()}</td>
                        <td>${user.getAge()}</td>
                        <td>${user.getEmail()}</td>
                        <td>${user.getRoles()}</td>
                        <td>
                            <button th:href="${'#edit' + user.getId()}" type="button" class="btn btn-info"
                                data-toggle="modal" value="${user.id}">Edit</button>
                        </td>
                        <td>
                            <button th:href="${'#delete' + user.getId()}" type="button" class="btn btn-danger"
                                 data-toggle="modal" value="${user.id}">Delete</button>
                        </td>
                    </tr>`;
    });
    usersTable.innerHTML = output;
}
//вывод таблицы всех пользователей
fetch('http://localhost:8080/api/users')
    .then(res => res.json())
    .then(data => renderUsers(data));