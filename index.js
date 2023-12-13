const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const jobRoute = require('./routes/job');
const bookmarkRoute = require('./routes/bookmark');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB CONNENTED'))
    .catch((err) => {
        console.log(err)
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', authRoute);
//endpoint: localhost:5001/api/register
app.use('/api/users', userRoute);
//endpoint: localhost:5001/api/users/id
app.use('/api/jobs', jobRoute);
app.use('/api/bookmarks', bookmarkRoute);


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`));