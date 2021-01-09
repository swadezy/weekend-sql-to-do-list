console.log('js');

$(onReady);

function onReady() {
    console.log('jq');
    refreshList();
    $('#submitBtn').on('click', addItem)
    $('#taskList').on('click', '.delBtn', deleteItem)
};

function refreshList() {
    console.log('in refresh');
    $('#taskList').empty();
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function (todos) {
        for (let item of todos) {
            $('#taskList').append(`<tr data-id=${item.id}>
            <td>${item.task}</td>
            <td>${item.due}</td>
            <td>${item.priority}</td>
            <td>${item.status}</td>
            <td><button class="statusBtn">Status</button></td>
            <td><button class="delBtn">Delete</button></td>
            </tr>
            `);
        }
    }).catch(function (error) {
        alert('error getting todos', error);
    });
};

function addItem() {
    console.log('in add');
    let fullTask = {
        task: $('#taskIn').val(),
        due: $('#dueIn').val(),
        priority: $('#priorityIn').val()
    };
    clearInputs();
    $.ajax({
        type: 'POST',
        url: '/todos',
        data: fullTask
    }).then(function (response) {
        console.log('received status', response);
        refreshList();
    }).catch(function (error) {
        alert('error adding item', error)
    });
};

function deleteItem() {
    const id = $(this).closest('tr').data().id
    console.log('in delete, id', id);
    $.ajax({
        type: 'DELETE',
        url: `/todos/${id}`,
    }).then(function (response) {
        console.log('deleted book');
        refreshList();
    }).catch(function (error) {
        alert('error in delete', error)
    })

};

function clearInputs() {
    console.log('in clear');
    $('#taskIn').val('')
    $('#dateIn').val('')
    $('#priorityIn').val('')
};