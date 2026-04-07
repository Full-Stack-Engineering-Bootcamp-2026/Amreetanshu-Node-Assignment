// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// to use it for the mongoDb connection
const getdb = require("../util/database").getDb;
class Product {
  constructor(title,price,description,imageUrl){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
  }

  save(){
    const db = getdb();
    db.collection('products').insertOne(this).then(
      result => {
        console.log(result);
      }
    ).catch( err =>{
      console.log(err);
    })   // here we can pass the object 
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
