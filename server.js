const conn = require('./db/conn');
const express = require('express');
const port = process.env.PORT || 3000 

const app = express();

conn
    .sync()
    /*sync({
        force: true,
    })*/
    .then(() => {
        app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log('Shut down server press Ctrl+C');
    });
})
    .catch((err) => console.log(err));