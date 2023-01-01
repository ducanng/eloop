exports.getHome= async (req,res,next) =>{
    res.render('users/home', {title: 'Trang chủ',messages: req.flash('message')})
}
