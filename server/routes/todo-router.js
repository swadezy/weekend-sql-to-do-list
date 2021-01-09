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

module.exports = router;