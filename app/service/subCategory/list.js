module.exports = function list(db, req, res) {
    db.collection('subCategory').find().toArray((error, subCategories) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        const { limit, offset, id} = req.query;
        const from = offset;
        const to = (+offset) + (+limit);

        const filtredResult = subCategories.filter(subCategory => subCategory.categoryId === id);

        const responce = {
            data  : filtredResult.slice(from, to),
            total : filtredResult.length
          }

        res.send(responce);
    });
}