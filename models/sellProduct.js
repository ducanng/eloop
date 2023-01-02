const { sequelize,DataTypes } = require('../config/db');
const { product } = require('./product');

const sellProduct = sequelize.define('sellProduct', {
  status:{
    type: DataTypes.STRING,
    allowNull: false
  },
  payment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
}, {
  // Other model options go here
});


console.log(sellProduct === sequelize.models.sellProduct); // true
async function findSellProduct(id){
  const sellSellProductInstance = await sellProduct.findOne({where : {id:id}})
  if (sellSellProductInstance === null){
    console.log('Not found!')
  }else{
    console.log('sellProduct is found!')
  }
  return sellSellProductInstance
}

async function addSellProduct(userId,productId){
  //   INSERT INTO admins(id, name, account, password, createdAt, updatedAt) VALUES
// (1, 'Letha241', 'Bolt@nowhere.com', 'gaaapjacc', '2016-01-01 00:07:13', '2017-01-01 00:00:04'),
  const productInstance = sellProduct.create({userId: userId, productId: productId})
  // sellProduct.update({userId:userId,productId:productId})
  if (userId ===undefined){
    userId = 1
  }
  // var normalizedDate = new Date(Date.now()).toISOString();
  // await sellProduct.sequelize.query(
  //   `INSERT INTO sellProducts( createdAt,updatedAt,productId, userId) VALUE (${normalizedDate},${normalizedDate},${userId},${productId})`,
  //   {
  //    type: sequelize.QueryTypes.INSERT,
  //   },
  //  );
  if(productInstance === null){
    console.log('SellProduct is fail!')
  }
  else {
    console.log('SellProduct is add!')
  }
}

async function addProductCart(userId,productId){
  //   INSERT INTO admins(id, name, account, password, createdAt, updatedAt) VALUES
// (1, 'Letha241', 'Bolt@nowhere.com', 'gaaapjacc', '2016-01-01 00:07:13', '2017-01-01 00:00:04'),
  payment = "not"
  quantity = 1
  status = 'not deli'
  if (userId === undefined){
    console.log("User hasn't logined")
    return
  }
  const productInstance = sellProduct.create({userId: userId, productId: productId,status:status ,payment: payment, quantity: quantity})
  // sellProduct.update({userId:userId,productId:productId})
  
  // var normalizedDate = new Date(Date.now()).toISOString();
  // await sellProduct.sequelize.query(
  //   `INSERT INTO sellProducts( createdAt,updatedAt,productId, userId) VALUE (${normalizedDate},${normalizedDate},${userId},${productId})`,
  //   {
  //    type: sequelize.QueryTypes.INSERT,
  //   },
  // //  );
  // const [results, metadata] = await sequelize.query(`DELETE FROM sellProducts WHERE userId = "${userId}" and sellProducts.productId = ${productId}`, 
  // { type: sequelize.QueryTypes.DELETE
  // })

  // console.log(results)
  // console.log(metadata)
  // console.log(`REMOVE record FORM sellProducts with productId = ${productId} AND userId = ${userId}`)
  if(productInstance === null){
    console.log('Shopping cart is fail!')
  }
  else {
    console.log('Shopping cart is add!')
  }
}

async function removeSellProduct(productId,userId){
  const [results, metadata] = await sequelize.query(`DELETE FROM sellProducts WHERE userId = "${userId}" and sellProducts.productId = ${productId}`, 
  { type: sequelize.QueryTypes.DELETE
  })

  console.log(results)
  console.log(metadata)
  console.log(`REMOVE record FORM sellProducts with productId = ${productId} AND userId = ${userId}`)
}

async function removeProductCart(productCartId,userId){
  const [results, metadata] = await sequelize.query(`DELETE FROM sellProducts WHERE userId = "${userId}" and id = "${productCartId}"`, 
  { type: sequelize.QueryTypes.DELETE
  })

  console.log(results)
  console.log(metadata)
  console.log(`REMOVE record FORM sellProducts with productId = ${productCartId} AND userId = ${userId}`)
}

async function getSellProductList(userId,productId){
   const productInstance = await sequelize.query(`SELECT * FROM sellProducts,products WHERE userId = "${userId}" and sellProducts.productId = ${productId}`, 
    { type: sequelize.QueryTypes.SELECT
        ,model : product
   });
    //    console.log(productInstance);     
    //    console.log(productInstance.length);       
  if (productInstance === null){
    console.log('list empty')
  }else{
    console.log('List Product is built!')
  }
  return productInstance
}

async function getShoppingCartList(userId){
  const productInstance = await sequelize.query(`SELECT price,productImageUrl,productName,products.id,sellProducts.id FROM sellProducts,products WHERE userId = "${userId}" and products.id = sellProducts.productId`, 
   { type: sequelize.QueryTypes.SELECT
  });   
  console.log(productInstance);
   //    console.log(productInstance.length);      

 if (productInstance === null){
   console.log('list empty')
 }else{
   console.log('List Product is built!')
 }
 return productInstance
}
// getSellProductList(1);
module.exports = {
  sellProduct,
  findSellProduct,
  addSellProduct,
  addProductCart,
  removeSellProduct,
  removeProductCart,
  getSellProductList,
  getShoppingCartList,
}