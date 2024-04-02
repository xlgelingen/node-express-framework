module.exports=function(app){
    app.use(require('./initFilter'));
    app.use(require('./loginFilter'));
}