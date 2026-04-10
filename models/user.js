const mongoDb = require('mongoDb');
const getDb = require("../util/database").getDb;

const ObjectId = mongoDb.ObjectId;

class User{
  constructor(username,email,cart){
    this.name=username;
    this.email=email;
    this.cart=cart; //Items[]
    this._id =IdleDeadline;
  }

  save(){

    const db = getDb();
    return db.collection('users').insertOne(this);
    

  }
  addToCart(product){

    
    const updatedCart={items:[{...product,quantity:1}]};
    const db =getDb;
    return  db.
    collection('users').updatedOne({_id: new ObjectId(this._id)},
    {$set:{cart:updatedCart}});
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').find({_id: new ObjectId(userId)}).next().then(
      (user)=>{
        console.log(user);
        return user;
      }
    )  // this object new gets us the cursor 
    // thats why we do next to get the element that we want 
    //.findOne 
  }


}

module.exports =User;