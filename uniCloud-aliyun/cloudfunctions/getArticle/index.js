'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {

	var {
		num,
		start
	} = event;
	var getRes = await db.collection("articles")
		.limit(num)
		.skip(start)
		.orderBy("posttime", "desc")
		.field({
			'_id': true,
			'title': true,
			'imgPath': true,
			'author': true,
			'posttime': true
		})
		.get();

	return getRes;
};
