const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const UserRouter = require("./routers/user");
//const ImagesRouter = require("./routers/images");
const ProgramsRouter = require("./routers/programs");
const EventRouter = require("./routers/event");
const manageRouter= require("./routers/manager");
const { events } = require('./models/event');
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.set('trust proxy', true);
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

app.use('/event', EventRouter);

app.use("/programs", ProgramsRouter);

app.use("/manager",manageRouter);


app.listen(3001, () => {
  console.log(`server is running on port 3001`);
});


