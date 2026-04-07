const Sequelize = require('sequelize');

const sequelize = require('../util/database');

class User{

  constructor(id,name,email){
    this.id=id;
    this.name =name;
    this.email-email;
  }

  save(){
     
  }
}

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = User;
