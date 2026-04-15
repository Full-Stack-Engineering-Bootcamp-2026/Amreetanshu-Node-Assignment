// // const Sequelize = require('sequelize');

// // const sequelize = require('../util/database');

// // to use it for the mongoDb connection
// const mongoDb = require('mongodb');
// const { getDb } = require('../util/database');
// const getdb = require("../util/database").getDb;
// class Product {
//   constructor(title,price,description,imageUrl, id,userId){
//     this.title=title;
//     this.price=price;
//     this.description=description;
//     this.imageUrl=imageUrl;
//     this._id = id ? new mongoDb.ObjectId(id):null;
//     this.userId=userId;
//   }

//   save(){
//     const db = getdb(); 
//     let dbOp;
//     if(this._id){
//       //update the product 
//       dbOp = db.collection('products').updateOne({_id: mongoDb.ObjectId(this._id)});
//     }
//     else{
//       dbOp = db
//       .collection('products')
//       .insertOne(this)
//     }
//    return dbOp.then(
//       result => {
//         console.log(result);
//       }
//     ).catch( err =>{
//       console.log(err);
//     })   // here we can pass the object 
//   }

//   static fetchAll(){
//     const db = getdb();  // always we are calling this method 
//     return db.collection('products').find().toArray().then(
//       product =>{
//         console.log(product);
//         return product;
//       }
//     ).catch(
//       err =>{
//         console.log(err)
//       }
//     );  // to call all the products 
//   }

//   static findById(prodId){
//     const db = getdb();
//     return db.collection('products').find({_id : new mongoDb.ObjectId(prodId)}).next().then(
//       (product)=>{
//         console.log(product);
//         return product;
//       }
//     ).catch(
//       (err)=>{console.log(err)}
//     );
//   }

//   static deleteByid(prodId){
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongoDb.ObjectId(prodId)})
//     .then(
//       (result)=>{console.log(result);}
//     ).catch(
//       (err)=>{
//         console.log(err);
//       }
//     )
//   }
// }

// // const Product = sequelize.define('product', {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   }
// // });

// module.exports = Product;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    imageUrl:{
      type:String,
      required:true
    },

    userId:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
);

module.exports = mongoose.model('Product',productSchema);


