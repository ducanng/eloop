const {product,findProduct,addProduct,removeProduct,getProductList} = require('../models/product')
const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../models/partner')

exports.getListProduct = async (req,res,next) =>{
    const partnerId = req.query.partner === undefined ? 1 : (req.query.partner)
    console.log(req.query.partner);

    const comboType = req.query.comboType
    console.log(req.query.comboType);

    const price = req.query.price
    console.log(req.query.price);
    
    const type = req.query.type
    console.log(req.query.type);
    
    const partnerList = await getPartnerList();
    const productList = await getProductList(partnerId);
    console.log(productList.length);
    productList.forEach(element => {
       console.log(element.name);  
    });
    res.render('users/menu', {productList : productList, partnerList : partnerList})
}

exports.geProductDetail = async (req,res,next) =>{
    const productId = req.params.id
    
    if(productId !== undefined){
        const product = await findProduct(productId);
        res.render('users/detail',{product:product})
    }
    res.render('users/detail')
}