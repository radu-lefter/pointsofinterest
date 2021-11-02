const express = require('express');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/pois', routes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});