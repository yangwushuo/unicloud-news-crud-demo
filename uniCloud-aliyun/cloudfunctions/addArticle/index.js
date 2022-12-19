'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {

	var tb = db.collection('articles');
	console.log(tb);

	var {
		title,
		author,
		imgUrl,
		content,
		posttime,
		imgPath
	} = event;

	var addArtRes = await tb.add({
		title,
		author,
		imgUrl,
		content,
		posttime,
		imgPath
	});

	//返回数据给客户端
	return addArtRes;
};
