module.exports = function list(db, req, res) {
    db.collection('category').find().toArray((error, categories) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        db.collection('subCategory').find().toArray((error, subCategories) => {
            if (error) res.send(JSON.stringify({status: 500, massage: error}));

            console.log(subCategories, categories)

            const structure = categories.map(category => {
                const { name, _id, subCategoryIds } = category;
                const subStructure = false ? [] : subCategoryIds.map(id => {
                    const subCategory = subCategories.find(subCategory => subCategory._id + '' === id + '');
                    const { name, _id } = subCategory;

                    return {
                        name,
                        _id
                    }
                });

                return {
                    subStructure,
                    name,
                    id: _id
                };
            });

            res.send(structure);
        });
    });
}