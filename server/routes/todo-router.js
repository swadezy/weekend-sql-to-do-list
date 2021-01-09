const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js')

router.get('/', (req, res) => {
    console.log('in get');
    let queryText = `SELECT * FROM "todos";`;
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
    VALUES ('${fullTask.task}', '${fullTask.due}', '${fullTask.priority}');`;
    pool.query(queryText).then(result => {
        console.log('book added successfully');
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding book,', error);
        res.sendStatus(500);
    });
});

module.exports = router;