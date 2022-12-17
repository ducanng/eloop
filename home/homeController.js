exports.getHome= async (req,res,next) =>{ 
    console.log(req)
    res.render('users/home')
}
