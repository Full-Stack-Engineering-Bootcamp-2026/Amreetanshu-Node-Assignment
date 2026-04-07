// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'Node-Starter',
//     password: 'Root@1234'
// });

// module.exports = pool.promise();

// without using the orm we used to do that upper code 
//now with sequelize we will do 

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('Node-Starter','root','Root@1234',{
//     dialect:'mysql',
//     host:'localhost'
// });
//we need to mention the dbname , user and the password  and a object as a 
// 4th param which is not mandatory 

//module.exports = sequelize;

// Now we will work with NoSql db

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback =>{
    MongoClient.connect('mongodb+srv://amreetanshusinha_db_user:lOF4300UEHKLlqEF@cluster0.ccluqq9.mongodb.net/?appName=Cluster0').then(
    client =>{
        console.log('connected');
        _db=client.db(); //store db
        callback();
    }
).catch(err=>{
    console.log(err);
});

};


const getDb=()=>{

    if(_db){
        return _db;

    }
    throw "No dataBase found ";
}

exports.mongoConnect = mongoConnect;
exports.getDb=getDb;

