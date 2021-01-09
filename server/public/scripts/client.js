console.log('js');

$(onReady);

function onReady() {
    console.log('jq');
    refreshList();
}

function refreshList() {
    console.log('in refresh');
    $('#taskList').empty();
    $.ajax({
        type: 'GET',
        url: 'todos'
    }).then(function (todos) {
        for (let item of todos) {
            $('#taskList').append(`<tr>
            <td>${item.task}</td>
            <td>${item.due}</td>
            <td>${item.priority}</td>
            </tr>
            `)
        }
    }).catch(function (error) {
        alert('error getting todos', error);
    });
};