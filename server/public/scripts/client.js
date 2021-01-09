console.log('js');

$(onReady);

function onReady() {
    console.log('jq');
    refreshList();
    $('#submitBtn').on('click', addItem)
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

function refreshList() {
    console.log('in refresh');
    $('#taskList').empty();
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function (todos) {
        for (let item of todos) {
            $('#taskList').append(`<tr>
            <td>${item.task}</td>
            <td>${item.due}</td>
            <td>${item.priority}</td>
            </tr>
            `);
        }
    }).catch(function (error) {
        alert('error getting todos', error);
    });
};

function clearInputs() {
    console.log('in clear');
    $('#taskIn').val('')
    $('#dateIn').val('')
    $('#priorityIn').val('')
};