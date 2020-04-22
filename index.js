const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const userRouter = require('./routes/userRooter');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log('中间件');
    next();
})

app.use('/user', userRouter);

app.listen(port,
    () =>
        console.log(`Example app listening on port ${port}!`))