const {product,findProduct,addProduct,removeProduct,getProductList,findRelativeProduct,getPriceList} = require('../models/product')
const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../models/partner')
const {catalogue,findCatalogue,addCatalogue,removeCatalogue,getCatalogueList} = require('../models/catalogue')

var sessionStorage = require('sessionstorage');
exports.getListProductQueryParam = async (req,res,next) =>{
    console.log(req.query);
    const partnerId = req.query.partner
    const catalogue = req.query.catalogue
    const price = req.query.price
    const sorting = req.query.sorting

    console.log(req.params);
    const defaultItemEachPage = 5
    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    let productList = await getProductList(partnerId,catalogue,price,sorting);
    let totalPages = parseInt(productList.length / defaultItemEachPage)
    console.log(totalPages);
    if (totalPages === 0){
        totalPages = 1
    }
    let currentPage = sessionStorage.getItem("currentPage")
    if (currentPage === "" || currentPage === undefined){
        currentPage = 1
    }
    let current = req.params.page
    if(current === undefined){
        current = 1
    }
    else if(current === 'previous'){
        current = currentPage
        current--
        if(current < 1){
            current = 1
        }
        res.redirect(`/menu/${current}`)
    }
    else if( current === 'next'){
        current = currentPage
        current++
        if(current > parseInt(totalPages)){
            current = totalPages
        }
        res.redirect(`/menu/${current}`)
    }
    console.log(current)
    sessionStorage.setItem("currentPage",current)

    
    const rightRange = defaultItemEachPage * parseInt(current)
    const leftRange = rightRange - defaultItemEachPage

    productList = productList.slice(leftRange,rightRange)

    const priceList = await getPriceList();

    res.render('users/menu', {productList : productList, partnerList : partnerList,catalogueList :catalogueList,priceList :priceList, pages :totalPages, current: current})
}


exports.getProductDetail = async (req,res,next) =>{
    const productId = req.params.id
    if(productId !== undefined){
        const product = await findProduct(productId);
        const relativeProductList = await findRelativeProduct(productId);
        res.render('users/detail',{product:product,relativeProductList:relativeProductList})
    }
    res.render('users/detail')
}