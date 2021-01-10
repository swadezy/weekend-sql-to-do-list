const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

// gets table from server & orders by completion, then by due date
router.get('/', (req, res) => {
    console.log('in get');
    let queryText = `SELECT * FROM "todos" ORDER BY "status" DESC, "due" ASC;`;
    pool.query(queryText).then(result => {
        console.log('received todos', result);
        res.send(result.rows)
    }).catch(error => {
        console.log('error getting todos', error);
        res.sendStatus(500);
    });
});

// adds task to table
router.post('/', (req, res) => {
    let fullTask = req.body
    console.log('in post, received', fullTask);
    let queryText = `INSERT INTO "todos" ("task", "due", "priority")
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [fullTask.task, fullTask.due, fullTask.priority]).then(result => {
        console.log('added task');
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding task,', error);
        res.sendStatus(500);
    });
});

// sends current date to table for a todo and sets status to complete
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let compDate = new Date();
    console.log('in put, received id', id);
    let queryText = `UPDATE "todos"
    SET "status" = 'Complete',
    "completed" = $2
    WHERE "id" = $1`
    pool.query(queryText, [id, compDate]).then(result => {
        console.log('updated task');
        res.sendStatus(204);
    }).catch(error => {
        console.log('error updating task,', error);
        res.sendStatus(500);
    });
});

// sends delete request
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('in delete, received id', id);
    let queryText = `DELETE FROM "todos" WHERE "id" = $1;`;
    pool.query(queryText, [id]).then(result => {
        console.log('deleted task');
        res.sendStatus(204);
    }).catch(error => {
        console.log('error deleting task,', error);
        res.sendStatus(500);
    });
});

module.exports = router;