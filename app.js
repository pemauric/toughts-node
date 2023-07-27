const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const toughtsRoutes = require('./routes/tought.routes');

const Tought = require('./models/Tought')

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json());

app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true,
        }
    })
)

app.use(flash());

app.use((req, res, next) => {
    if(req.session.useId) {
        res.locals.session = req.session
    }
    
    next()
})
app.use('/', toughtsRoutes);


app.get('/', (req, res) => {
    res.render('home')
});




