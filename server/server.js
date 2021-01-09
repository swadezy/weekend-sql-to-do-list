const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const todoRouter = require('./routes/todo-router.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);

})