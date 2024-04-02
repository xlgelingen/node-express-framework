module.exports = function (req, res, next) {
    res.locals.seo = {
      title: 'combat-crm',
      keywords: 'Express、Nodejs',
      description: 'combat-crm'
    }
  
    next();
  }