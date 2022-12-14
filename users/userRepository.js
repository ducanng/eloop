const {user} = require("../models/user.js")

async function findUser(account){
    const userInstance = await user.findOne({where : {account:account}})
    if (userInstance === null){
      console.log('Not found!')
    }else{
      console.log('User is found!')
    }
    return userInstance
  }

  async function findUserId(account){
    const userInstance = await sequelize.query(`SELECT id FROM users WHERE account = "${account}"`, 
    { type: sequelize.QueryTypes.SELECT});
  
    if (userInstance[0] === null){
      console.log('Not found!')
      return null
    }else{
      console.log('User is found!')
    }
    console.log(userInstance[0].id); 
    return userInstance[0].id; 
  }
  
  async function addUser(name, account, password, phone_number) {
    const existUser = await findUser(account)
    if(existUser === null){
      const userInstance = user.create({name: name, account: account, password : password, phone_number: phone_number})
      console.log('User is added!')
      return true
    }
    else {
      console.log('User is exist!')
      return false
    }
  }
  
  async function removeUser(account){
    const userInstance = await findUser(account)
    if(userInstance === null){
      console.log('User is not exist!')
    }
    else {
      userInstance.destroy()
      console.log('User is removed!')
    }
  }
  
  async function updateUser(name, account, password){
    const userInstance = await user.update({
      name: name, account: account, password : password},
      {
        where : {
          account: account
      }
    })
    if(userInstance === null){
      console.log('User is not exist!')
    }
    else {
      userInstance.destroy()
      console.log('User is updated!')
    }
  }
  // removeUser('huyhoang')
  // addUser('hu','test','123')
  // updateUser('hu','hh','12345')
  
  module.exports ={findUser,addUser,removeUser,updateUser,findUserId}