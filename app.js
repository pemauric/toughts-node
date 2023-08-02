const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const conn = require('./db/conn');
const port = process.env.PORT || 3000 

const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const Tought = require('./models/Tought')

const User = require('./models/User');

const toughtsRoutes = require('./routes/tought.routes');
const authRoutes = require('./routes/auth.routes');

const ToughtController = require('./controllers/ToughtController');

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

app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showAll)

conn.
    //sync()
    sync({force: true})
    .then(() => {
        app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log('Shut down server press Ctrl+C');
    });
})
    .catch((err) => console.log(err));








