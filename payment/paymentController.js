const {product,findProduct,addProduct,removeProduct,getProductList,findRelativeProduct,getPriceList} = require('../models/product')
const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../models/partner')
const {catalogue,findCatalogue,addCatalogue,removeCatalogue,getCatalogueList} = require('../models/catalogue')

var sessionStorage = require('sessionstorage');
exports.addToCart = async (req,res,next) =>{
      const productId = req.params.id
      if(productId !== undefined){
            const product = await findProduct(productId);
            
            res.render('users/shopping-cart',{product:product})
      }
}