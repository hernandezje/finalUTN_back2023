const express = require("express");
const bodyParser =  require("body-parser");
const userRouter = require("./src/route/usersRoute");
const cors = require("cors");
const app = express();

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Autorizathion,X-API-KEY,rigin,X-Request');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE')
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(userRouter);
app.use(cors());

module.exports = app;