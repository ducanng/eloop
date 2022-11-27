const {searchProduct} = require('../models/product')
const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../models/partner')
const {catalogue,findCatalogue,addCatalogue,removeCatalogue,getCatalogueList} = require('../models/catalogue')
exports.findProductWithSearch = async (req,res,next) => {
    const key = req.body.searcher
    
    const partnerId = ""
    console.log(req.query.partner);

    const catalogue = ""
    console.log(req.query.catalogue);

    const price = ""
    console.log(req.query.price);
    
    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    const productList = await searchProduct(key)
    console.log(productList.length)

    if(productList !== null ){
        res.render('users/menu', {productList : productList, partnerList : partnerList,catalogueList :catalogueList})
    } else {
        res.redirect('/home')
    }
}

