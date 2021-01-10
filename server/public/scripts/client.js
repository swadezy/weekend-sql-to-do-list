console.log('js');

$(onReady);

// clears inputs, click listens, and refreshes table on ready
function onReady() {
    console.log('jq');
    clearInputs()
    refreshList();
    $('#submitBtn').on('click', addItem);
    $('#taskList').on('click', '.delBtn', deleteItem);
    $('#taskList').on('click', '.statusBtn', completeItem);
};

// clears old table & appends new one using get request
function refreshList() {
    console.log('in refresh');
    $('#taskList').empty();
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function (todos) {
        for (let item of todos) {
            // after a solid amount of stackoverflow trial and error this is how I removed the gross timezone stuff from dates
            // I'm sure there's a better way to do this date business...
            let date = new Date(item.due)
            let noTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let toStringDate = noTime.toDateString();
            let compDate = new Date(item.completed);
            let noCompTime = new Date(compDate.getFullYear(), compDate.getMonth(), compDate.getDate());
            let toCompString = noCompTime.toDateString();

            // appends new table, different logic for incomplete tasks, complete but late tasks, and complete but early tasks
            if (item.status == 'Complete' && toStringDate >= toCompString) {
                $('#taskList').append(`<tr data-id=${item.id}>
                <td class="completeStrike">${item.task}</td>
                <td>${toStringDate}</td>
                <td class="red">${toCompString}</td>
                <td>${item.priority}</td>
                <td class="completeColor">${item.status}</td>
                <td></td>
                <td><button class="delBtn btn btn-danger">Delete</button></td>
                </tr>`);
            } else if (item.status == 'Complete' && toStringDate < toCompString) {
                $('#taskList').append(`<tr data-id=${item.id}>
                <td class="completeStrike">${item.task}</td>
                <td>${toStringDate}</td>
                <td class="green">${toCompString}</td>
                <td>${item.priority}</td>
                <td class="completeColor">${item.status}</td>
                <td></td>
                <td><button class="delBtn btn btn-danger">Delete</button></td>
                </tr>`);
            } else if (item.status == 'Pending') {
                $('#taskList').append(`<tr data-id=${item.id}>
                <td>${item.task}</td>
                <td>${toStringDate}</td>
                <td>-</td>
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

// confirms all 3 fields are completed then adds to table using post request & refreshes
function addItem() {
    if ($('#taskIn').val() == '' || $('#dueIn').val() == '' || $('#priorityIn').val() == 'Priority level...') {
        alert('Please complete all fields')
    } else {
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
};

// marks task as complete using put request
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

// uses sweetalert to confirm user intends to delete, then deletes a task using delete request
function deleteItem() {
    const id = $(this).closest('tr').data().id
    console.log('in delete, id', id);
    swal({
        title: "Confirm Delete:",
        text: "Are you certain you want to remove this task?",
        icon: "warning",
        buttons: [true, "Delete"]
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: 'DELETE',
                url: `/todos/${id}`,
            }).then(function (response) {
                console.log('deleted task');
                refreshList();
            }).catch(function (error) {
                alert('error in delete', error)
            })
        }
    });
}

// clears input fields
function clearInputs() {
    console.log('in clear');
    $('#taskIn').val('')
    $('#dueIn').val('')
    $('#priorityIn').val('Priority level...')
};