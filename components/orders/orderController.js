const {
    sellProduct,
  findSellProduct,
  addSellProduct,
  removeSellProduct,
  getSellProductList,
} = require('../../models/sellProduct')
exports.getSellProductList = async (req,res,next) =>{
    const userId = req.params.userId
 
    const sellProductList = await getSellProductList(1)
    console.log(sellProductList.length);
 
    res.render('users/sellProduct',{sellProductList :sellProductList})
}
exports.addToSellProduct = async (req,res,next) =>{
  const productId = req.params.id
  console.log(productId);
  await addSellProduct(global.userLoginId,productId)
  res.redirect('/menu')
}
