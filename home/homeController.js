const {partner,findpartner,addpartner,removepartner,getpartnerList} = require('../models/partner')

exports.getPartner = async (req,res,next) =>{
    const partnerList = await getPartnerList()
    console.log(partnerList.length);
    partnerList.forEach(element => {
       console.log(element.name);  
    });
    res.render('users/home', {partnerList : partnerList})
}
