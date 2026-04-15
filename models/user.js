// const mongoDb = require('mongoDb');
// const getDb = require("../util/database").getDb;

// const ObjectId = mongoDb.ObjectId;

// class User{
//   constructor(username,email,cart){
//     this.name=username;
//     this.email=email;
//     this.cart=cart; //Items[]
//     this._id =IdleDeadline;
//   }

//   save(){

//     const db = getDb();
//     return db.collection('users').insertOne(this);
    

//   }
//   addToCart(product){

    
//     const updatedCart={items:[{...product,quantity:1}]};
//     const db =getDb;
//     return  db.
//     collection('users').updatedOne({_id: new ObjectId(this._id)},
//     {$set:{cart:updatedCart}});
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db.collection('users').find({_id: new ObjectId(userId)}).next().then(
//       (user)=>{
//         console.log(user);
//         return user;
//       }
//     )  // this object new gets us the cursor 
//     // thats why we do next to get the element that we want 
//     //.findOne 
//   }


// }

// module.exports =User;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);