'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	var {
		id
	} = event;
	const delRes = await db.collection('articles').doc(id).remove();
	return delRes;
};
