const express = require('express');
const exphbs = require('express-handlebars');

const toughts = require('./routes/tought.routes');

const app = express();

app.use('view engine', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json());



