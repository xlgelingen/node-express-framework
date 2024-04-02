const auth = {
  isLogin: function (req, res, next) {
    if (!res.locals.isLogin) {
      res.redirect('/login')
      return
    }
    next();
  },

  isKeeper: function (req, res, next) {
    console.log('auth-res.locals.userInfo.permissions', res.locals.userInfo.permissions)
    if (!res.locals.userInfo || !res.locals.userInfo.permissions.includes(1)) {
      res.render('error', { status: 403, message: '403 Forbidden' })
      return
    }
    next();
  }
}

module.exports = auth;