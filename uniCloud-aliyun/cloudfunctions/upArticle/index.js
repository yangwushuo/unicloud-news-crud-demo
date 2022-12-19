'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	var {
		id,
		title,
		author,
		content,
		imgPath
	} = event;
	const upRes = await db.collection("articles").doc(id).update({
		title,
		author,
		content,
		imgPath
	});
	return upRes;
};
