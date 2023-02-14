const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
import UserRouter from "./routers/user"
import ImagesRouter from "./routers/images"
import ProgramsRouter from "./routers/programs"

app.use(cors());
app.options('*', cors());

app.use(express.text({ limit: '26mb' }));

app.post('/token', async (req, res) => {
    const userToken = req.get('token');
    if (userToken == undefined) {
        return res.status(202).send({ success: false, msg: 'invalid' });
    }
    var updatedToken = await updateToken(userToken);
    res.status(200).send({ success: true, token: updatedToken });
});

app.use('/', async (req, res, next) => {
    next();
});
app.use('/users', UserRouter);
// app.use('/chat', chatRouter);

/*app.get('/', (req, res) => {
  if (req.hostname != 'localhost')
    return res.status(404).send({ success: false, msg: 'Access denied' });
  res.send(adminPage);
});*/
// console.log(process.env.PORT);
app.listen(3000, () => {
    console.log(`server is running on port 3000`);
});

