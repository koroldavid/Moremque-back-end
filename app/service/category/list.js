module.exports = function list(db, req, res) {
    db.collection('category').find().toArray((error, categories) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        const { limit, offset} = req.query;
        const from = offset;
        const to = (+offset) + (+limit);

        const responce = {
          data  : categories.slice(from, to),
          total : categories.length
        }

        res.send(responce);
    });
}