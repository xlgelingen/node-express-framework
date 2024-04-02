const isbnModel = require("./../models/isbn");
const book = {
  info: async function (req, res, next) {
    const ISBN = req.query.isbn;
    try {
      const bookRequest = await isbnModel.getIsbn(ISBN);

      res.json({ code: 200, data: bookRequest.data });
    } catch (e) {
      res.json({ code: 100, data: e });
    }
  },
};

module.exports = book;
