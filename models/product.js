const { sequelize,DataTypes } = require('../config/db');

const product = sequelize.define('product', {
  // Model attributes are defined here
  productImageUrl:{
      type: DataTypes.STRING,
      allowNull: false
    },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(3000),
    allowNull: true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model

const waterType = Object.freeze({
  type_1 : "Nước Giải Khát",
  type_2 : "Nước uống",
  type_3 : "Thức uống"
})

console.log(product === sequelize.models.product); // true
async function findProduct(id){
  const productInstance = await product.findOne({where : {id:id}})
  if (productInstance === null){
    console.log('Not found!')
  }else{
    console.log('product is found!')
  }
  return productInstance
}

async function addProduct(name, account, password){
  const existProduct = await findProduct(account)
  if(existProduct === null){
    const productInstance = product.create({name: name, account: account, password : password})
    console.log('Product is added!')
  }
  else {
    console.log('Product is exist!')
  }
}

async function removeProduct(account){
  const productInstance = await findProduct(account)
  if(productInstance === null){
    console.log('Product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('Product is removed!')
  }
}

async function updateProduct(name, account, password){
  const productInstance = await product.update({
    name: name, account: account, password : password},
    {
      where : {
        account: account
    }
  })
  if(productInstance === null){
    console.log('product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('User is updated!')
  }
}

async function getProductList(storeId,catalogueId,price){
  const type = "Thức uống"
  if(type == typeof(waterType)){

    console.log("this true");
    console.log(typeof(waterType));
    
  }
  else{
    console.log("this false");
    console.log(waterType);
  }
  // const productList = null
  // storeId = (storeId === undefined) ? 1 : storeId
  // catalogueId = (catalogueId === undefined) ? "all" : catalogueId
  // price = (price === undefined) ? 10000 : price
    
  // if(storeId === undefined){
  //   productList = await product.findAll()
  // }
  // if(storeId !== undefined && catalogueId === undefined && ){

  // }
  // storeId = (storeId === undefined) ? 1 : storeId
  // productList = await product.findAll({where : {storeId: storeId}})
  // if (productList === null){
  //   console.log('Store id is not exists')
  // }else{
  //   console.log('List Product is built!')
  // }
  // return productList
  storeId = (storeId === undefined) ? 1 : storeId
  const productList = await product.findAll({where : {storeId: storeId}})
  if (productList === null){
    console.log('Store id is not exists')
  }else{
    console.log('List Product is built!')
  }
  return productList
}

module.exports = {
  product,
  findProduct,
  addProduct,
  removeProduct,
  getProductList
}
