const { user } = require("../../models/user.js")
const { sequelize } = require("../../config/db.js")
async function findUser(account) {
  const userInstance = await user.findOne({ where: { account: account } })
  if (userInstance === null) {
    console.log('Not found!')
  } else {
    console.log('User is found!')
  }
  return userInstance
}
async function findUserId(account) {
  const userInstance = await sequelize.query(`SELECT id FROM users WHERE account = "${account}"`,
    { type: sequelize.QueryTypes.SELECT });

  if (userInstance[0] === null) {
    console.log('Not found!')
    return null
  } else {
    console.log('User is found!')
  }
  console.log(userInstance[0].id);
  return userInstance[0].id;
}
async function findUserByToken(token) {
  const userInstance = await user.findOne
    ({ where: { token: token } })
  if (userInstance === null) {
    console.log('Not found!')
  } else {
    console.log('User is found!')
  }
  return userInstance
}
async function addUser(name, account, password, phone_number) {
  const existUser = await findUser(account)
  if (existUser === null) {
    const userInstance = user.create({ name: name, account: account, password: password, phone_number: phone_number, status: 0, image:image })
    console.log('User is added!')
    return true
  }
  else {
    console.log('User is exist!')
    return false
  }
}

async function removeUser(account) {
  const userInstance = await findUser(account)
  if (userInstance === null) {
    console.log('User is not exist!')
    return false;
  }
  else {
    userInstance.destroy()
    console.log('User is removed!')
    return true;
  }
}
async function updateInfoUser(account, image ,name, address, phone_number) {
  let sqlUpdate = 'UPDATE users SET ';
  if(image !== ''){
    sqlUpdate += `image = "${image}"`
  }
  if (name !== '') {
    if(image !== ''){
      sqlUpdate += ', ';
    }
    sqlUpdate += `name = "${name}"`;
  }
  if (address !== '') {
    if (name !== '') {
      sqlUpdate += ', ';
    }
    sqlUpdate += `, address = "${address}"`;
  }
  if (phone_number !== '') {
    sqlUpdate += `, phone_number = "${phone_number}"`;
  }
  if (sqlUpdate === 'UPDATE users SET ') {
    console.log('No data to update!');
    return false;
  }
  sqlUpdate += ` WHERE account = "${account}"`;

  const userInstance = await sequelize.query(sqlUpdate, { type: sequelize.QueryTypes.UPDATE });

  if (userInstance === null) {
    console.log('Updated failed!')
    return false
  }
  else {
    console.log('User is updated!')
    return true
  }
}
async function updateAccountUser(account, newAccount) {
  const userInstance = await user.update({
    account: newAccount
  },
    {
      where: {
        account: account
      }
    })
  if (userInstance === null) {
    console.log('User is not exist!')
    return false;
  }
  else {
    console.log('User is updated!')
    return true;
  }
}
async function updatePasswordUser(account, password) {
  const userInstance = await user.update({
    password: password
  },
    {
      where: {
        account: account
      }
    })
  if (userInstance === null) {
    console.log('User is not exist!')
    return false;
  }
  else {
    console.log('User is updated password!')
    return true
  }
}
async function updateTokenUser(account, token) {
  const userInstance = await user.update({
    token: token
  },
    {
      where: {
        account: account
      }
    })
  if (userInstance === null) {
    console.log('User is not exist!')
    return false;
  }
  else {
    console.log('User is updated token!')
    return true;
  }
}
// removeUser('huyhoang')
// addUser('hu','test','123')
// updateUser('hu','hh','12345')

module.exports = { findUser, addUser, removeUser, updateInfoUser, updateAccountUser,
   updatePasswordUser, findUserId, updateTokenUser, findUserByToken}