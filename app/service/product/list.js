module.exports = function list(db, req, res) {
    db.collection('product').find().toArray((error, product) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        let data = product;

        const { limit, offset, id, paranoid } = req.query;
        const from = offset;
        const to = (+offset) + (+limit);

        data = data.filter(el => el.subCategoryId === id);
        if (paranoid !== undefined) {
          data = data.filter(el => el.paranoid + '' === paranoid);
        } else {
          data = data.filter(el => el.paranoid);
        }

        const responce = {
          data  : data.slice(from, to),
          total : data.length
        }

        res.send(responce);
    });
}
