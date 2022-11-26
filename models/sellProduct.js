const { sequelize,DataTypes } = require('../config/db');
const { product } = require('./product');

const sellProduct = sequelize.define('sellProduct', {
  
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

async function removeSellProduct(id){
  const productInstance = await findSellProduct(id)
  if(productInstance === null){
    console.log('Product is not exist!')
  }
  else {
    productInstance.destroy()
    console.log('Product is removed!')
  }
}



async function getSellProductList(userId){
   const productInstance = await sequelize.query(`SELECT * FROM sellProducts,products WHERE userId = "${userId}" and sellProducts.productId = products.id`, 
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
// getSellProductList(1);
module.exports = {
    sellProduct,
  findSellProduct,
  addSellProduct,
  removeSellProduct,
  getSellProductList,
}
