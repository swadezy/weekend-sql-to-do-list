console.log('js');

$(onReady);

function onReady() {
    console.log('jq');
    clearInputs()
    refreshList();
    $('#submitBtn').on('click', addItem);
    $('#taskList').on('click', '.delBtn', deleteItem);
    $('#taskList').on('click', '.statusBtn', completeItem);
};

function refreshList() {
    console.log('in refresh');
    $('#taskList').empty();
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function (todos) {
        for (let item of todos) {
            if (item.status == 'Complete') {
                $('#taskList').append(`<tr data-id=${item.id}>
                <td>${item.task}</td>
                <td>${item.due}</td>
                <td>${item.priority}</td>
                <td class="complete">${item.status}</td>
                <td></td>
                <td><button class="delBtn btn btn-danger">Delete</button></td>
                </tr>`);
            } else if (item.status == 'Pending') {
                $('#taskList').append(`<tr data-id=${item.id}>
                <td>${item.task}</td>
                <td>${item.due}</td>
                <td>${item.priority}</td>
                <td>${item.status}</td>
                <td><button class="statusBtn btn btn-success">Complete</button></td>
                <td><button class="delBtn btn btn-danger">Delete</button></td>
                </tr>`);
            };
        };
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

function completeItem() {
    const id = $(this).closest('tr').data().id
    console.log('in update, id', id);
    $.ajax({
        type: 'PUT',
        url: `/todos/${id}`,
    }).then(function (response) {
        console.log('updated task');
        refreshList();
    }).catch(function (error) {
        alert('error in update', error)
    });
};

function deleteItem() {
    const id = $(this).closest('tr').data().id
    console.log('in delete, id', id);
    $.ajax({
        type: 'DELETE',
        url: `/todos/${id}`,
    }).then(function (response) {
        console.log('deleted task');
        refreshList();
    }).catch(function (error) {
        alert('error in delete', error)
    });
};

function clearInputs() {
    console.log('in clear');
    $('#taskIn').val('')
    $('#dateIn').val('')
    $('#priorityIn').val('Priority level...')
};