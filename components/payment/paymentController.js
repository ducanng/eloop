const {sellProduct,findSellProduct,addSellProduct,addProductCart,removeSellProduct,removeProductCart,getSellProductList,getShoppingCartList} = require('../models/sellProduct')

var sessionStorage = require('sessionstorage');
exports.getShoppingCartList = async (req,res,next) =>{
      const userId = req.params.userId
   
      const sellProductList = await getShoppingCartList(1)
      console.log(sellProductList.length);
   
      res.render('users/shopping-cart',{sellProductList :sellProductList})
  }
// exports.addToCart = async (req,res,next) =>{
//       const productId = req.params.id
//       console.log("Product id:")
//       console.log(productId);
      
//       await addProductCart(global.userLoginId,productId)
//       res.redirect('/menu')
// }

// exports.removeOutCart = async (req,res,next) =>{
//       const productId = req.params.id
//       console.log("Product ID:")
//       console.log(productId)
      
      
//       if(productId !== undefined){
         
//           console.log("............................................")
//           await removeProductCart(productId);
          
//           const userId = req.params.userId;     
   
//           const sellProductList = await getShoppingCartList(1);
//           res.render('users/shopping-cart',{sellProductList :sellProductList})
//       }
//       //res.render('admins/product')
//   }