const express=require('express');
const contactrouter = require('./routes/contactroute');
const errorHandler = require('./middlewares/errorhandler');
const conectdb = require('./config/dbconnection');
const app=express();
const port=8000;
const userrouter=require('./routes/userroutes');

conectdb();
app.use(express.json());
app.use('/api/contacts',contactrouter);
app.use('/api/users',userrouter);
app.use(errorHandler);



app.listen(port,()=>{
    console.log(`Server running on port:${port}`);
})