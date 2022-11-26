const {partner,findPartner,addPartner,removePartner,getPartnerList} = require('../models/partner')

exports.getPartner = async (req,res,next) =>{
    const partnerList = await getPartnerList()
    console.log(partnerList.length);
    partnerList.forEach(element => {
       console.log(element.name);  
    });
 
    console.log(global.userLogined);
    res.render('users/home')
}
