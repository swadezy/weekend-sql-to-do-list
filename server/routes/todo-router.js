const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
    console.log('in get');
    let queryText = `SELECT * FROM "todos" ORDER BY "status" DESC;`;
    pool.query(queryText).then(result => {
        console.log('received todos', result);
        res.send(result.rows)
    }).catch(error => {
        console.log('error getting todos', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    let fullTask = req.body
    console.log('in post, received', fullTask);
    let queryText = `INSERT INTO "todos" ("task", "due", "priority")
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [fullTask.task, fullTask.due, fullTask.priority]).then(result => {
        console.log('added book');
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding book,', error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let compDate = new Date();
    // let timeToSend  = new Date(compDate.getFullYear(), compDate.getMonth(), compDate.getDate());
    console.log(compDate);
    
    console.log('in put, received id', id);
    let queryText = `UPDATE "todos"
    SET "status" = 'Complete',
    "completed" = $2
    WHERE "id" = $1`
    pool.query(queryText, [id, compDate]).then(result => {
        console.log('updated book');
        res.sendStatus(204);
    }).catch(error => {
        console.log('error updating book,', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log('in delete, received id', id);
    let queryText = `DELETE FROM "todos" WHERE "id" = $1;`;
    pool.query(queryText, [id]).then(result => {
        console.log('deleted book');
        res.sendStatus(204);
    }).catch(error => {
        console.log('error deleting book,', error);
        res.sendStatus(500);
    });
});

module.exports = router;