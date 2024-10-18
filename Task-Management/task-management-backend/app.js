require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const dbConfig = require('./db.config');

app.use(cors({
    origin: [
        'http://localhost:5173',
    ]
}));

app.use(express.urlencoded({ limit: '10mb', extends: true }));
app.use(express.json());

console.log('hello console!...');

/* DB connection */
mongoose.connect(dbConfig.url);
const connection = mongoose.connection;
connection.once('open', function () {
    console.log('DB connected!!');
});
connection.once('error', function (error) {
    console.log('DB connection error!!')
});



/* --- GET Routes */
const taskRoute = require('./api/routes/task');



/* --- SET API Routes */
app.use('/api/tasks', taskRoute);


app.get('/', function (req, res) {
    res.send('Hello World')
});



/* --- PORT */
app.listen((process.env.PORT || 8080), () => {
    console.log('Server is started at port:' + (process.env.PORT || 8080));
});