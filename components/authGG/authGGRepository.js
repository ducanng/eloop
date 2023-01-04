const { user } = require("../../models/user.js")

async function findUser(account) {
    const userInstance = await user.findOne({
        where: {
            account: account
        }
    })
    if (userInstance === null) {
        console.log('Not found!')
    } else {
        console.log('User is found!')
    }
    return userInstance
}

async function addUser(id, name, account) {
    const userInstance = user.create({
        id: id,
        name: name,
        account: account,
        verify: 'done'
    })
    //const userInstance = user.create({ name: name, account: account, password: password, phone_number: phone_number, status: 0, image:image })
    console.log('User is added!')
    if (userInstance === null) {
        console.log('Not found!')
        return false
    } else {
        console.log('User is found!')
        return true
    }
}

module.exports = { findUser, addUser }