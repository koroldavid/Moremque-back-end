module.exports = function list(db, req, res) {
    db.collection('category').find().toArray((error, categories) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        let data = categories;

        const { limit, offset, paranoid } = req.query;
        const from = offset;
        const to = (+offset) + (+limit);

        if (paranoid !== undefined) {
          data = data.filter(el => el.paranoid + '' === paranoid);
        } else {
          data = data.filter(el => el.paranoid);
        }

        responce = {
          data  : data.slice(from, to),
          total : data.length
        };

        res.send(responce);
    });
}
