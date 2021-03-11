module.exports.isLoggedIn = (res, req, next) =>{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}