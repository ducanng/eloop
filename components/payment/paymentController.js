const {sellProduct,findSellProduct,addSellProduct,addProductCart,removeSellProduct,removeProductCart,getSellProductList,getShoppingCartList} = require('../../models/sellProduct.js')

exports.getShoppingCartList = async (req,res,next) =>{
  let userId = 0
  if(req.user !== undefined){
    userId = req.user.id 
  }

  const shoppingCartList = await getShoppingCartList(userId)

  const payment = {
    price: 0
  };
  let paymentInstance =  Object.create(payment)
  shoppingCartList.forEach(element => {
    paymentInstance.price += parseInt(element.price)
  });

  
  res.render('users/shopping-cart',{shoppingCartList :shoppingCartList,paymentInstance:paymentInstance})
}

exports.addToCart = async (req,res,next) =>{
  let userId = 0
  if(req.user !== undefined){
    userId = req.user.id 
  }

  const productId = req.params.id
  console.log("Product id:")
  console.log(productId);
  await addProductCart(userId,productId)
  res.redirect('back')
}

exports.removeOutCart = async (req,res,next) =>{
  console.log("............................................")
  const productCartId = req.params.id
  let userId = 0
  if(req.user !== undefined){
    userId = req.user.id 
  }

  console.log("Product ID:")
  console.log(productCartId)
  
  if(productCartId !== undefined){
      
    console.log("............................................")
    await removeProductCart(productCartId,userId);  
    const shoppingCartList = await getShoppingCartList(userId);
    res.redirect('back')
      // res.render('users/shopping-cart',{shoppingCartList :shoppingCartList})
  }
    
    //res.render('admins/product')
}