const express = require('express');
const bodyParser = require('body-parser')
const index = require('./routes/index');
const query = require('./routes/query')
const edit = require('./routes/edit');
const delet = require('./routes/delete');
const insert = require('./routes/insert')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/", index);

app.use("/query", query);

app.use("/insert", insert)

app.use("/edit", edit);

app.use("/delete", delet);

app.listen( PORT, () => {
    console.log("Server running at port: " + PORT);
});

module.exports = app;