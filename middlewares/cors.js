const cors = {
  allowAll: function (req, res, next) {
    // 允许所有请求头
    res.header("Access-Control-Allow-Headers", "*");
    // 允许来自所有来源的请求
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // 允许的 HTTP 方法
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 允许发送 Cookie
    res.header("Access-Control-Allow-Credentials", true);
    // 调用下一个中间件
    next();
  },
};

module.exports = cors;
