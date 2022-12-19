'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {

	var {
		id
	} = event;
	var getRes = await db.collection("articles")
		.doc(id)
		.get();

	return getRes;
};
