const mongoose=require('mongoose');

const conectdb= async()=>{
    try {
        const connect=await mongoose.connect('mongodb://localhost:27017/MyContacts');
        console.log("Database Connected:",connect.connection.host,connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports=conectdb;