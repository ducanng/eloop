const {product,findProduct,addProduct,removeProduct,getProductList,findRelativeProduct,getPriceList} = require('../../models/product')
const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../../models/partner')
const {catalogue,findCatalogue,addCatalogue,removeCatalogue,getCatalogueList} = require('../../models/catalogue')


var sessionStorage = require('sessionstorage');

exports.getListProductQueryParam = async (req,res,next) =>{
    console.log(req.query);
    const partnerId = req.query.partner
    const catalogue = req.query.catalogue
    const price = req.query.price
    const sorting = req.query.sorting
    const page = req.query.page || 1
    console.log(req.params);
    sessionStorage.setItem("set",6)
    const defaultItemEachPage = 5

    const partnerList = await getPartnerList(partnerId);
    const catalogueList = await getCatalogueList(catalogue);
    let productList = await getProductList(partnerId,catalogue,price,sorting);

   
    const pageCount = Math.ceil(productList.length /defaultItemEachPage)
    console.log(pageCount);
   
    const rightRange = defaultItemEachPage * parseInt(page)
    const leftRange = rightRange - defaultItemEachPage

    productList = productList.slice(leftRange,rightRange)

    const priceList = await getPriceList();

    res.render('users/menu', {productList : productList, 
                            partnerList : partnerList,
                            catalogueList :catalogueList,
                            priceList :priceList, 
                            pagination: {
                                page: page ,
                                pageCount: pageCount
                              }
                            })
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