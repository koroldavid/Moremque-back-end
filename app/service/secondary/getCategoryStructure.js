module.exports = function getCategoryStructure(db, req, res) {
    db.collection('category').find().toArray((error, categories) => {
        if (error) res.send(JSON.stringify({status: 500, massage: error}));

        db.collection('subCategory').find().toArray((error, subCategories) => {
            if (error) res.send(JSON.stringify({status: 500, massage: error}));

            

            const structure = categories.filter(category => !category.paranoid).map(category => {
                const { name, _id, subCategoryIds } = category;
                const subStructure = subCategoryIds.map(id => {
                    const subCategory = subCategories.find(subCategory => subCategory._id + '' === id + '');
                    const { name, _id, paranoid } = subCategory;

                    return {
                        name,
                        _id,
                        paranoid
                    }
                }).filter(subStuct => !subStuct.paranoid);

                return {
                    subStructure,
                    name,
                    _id
                };
            });

            res.send(structure);
        });
    });
}
