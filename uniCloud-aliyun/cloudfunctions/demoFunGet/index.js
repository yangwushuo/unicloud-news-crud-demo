'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	var res = db.collection('users').doc('').get();

	//返回数据给客户端
	return res;
};
