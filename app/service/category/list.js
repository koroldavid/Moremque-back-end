module.exports = function list(db, req, res) {
    db.collection('category').find().toArray((error, categories) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        const { limit, offset} = req.query;
        const from = offset;
        const to = (+offset) + (+limit);

        const nonParanoid = categories.filter(category => !category.paranoid);

        const responce = {
          data  : nonParanoid.slice(from, to),
          total : nonParanoid.length
        }

        res.send(responce);
    });
}
