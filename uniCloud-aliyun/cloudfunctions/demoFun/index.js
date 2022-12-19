'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const jsonData = [{
			"id": "28ee4e3e6050598b0af006d25246ec3f",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/a95e5617-49b9-4613-aa8c-a8e529a28ba6.jpg",
			"price": "5208/饼",
			"title": "六妙紫印"
		},
		{
			"id": "28ee4e3e6050b76c0b014bdb0431265a",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/eb9ffa17-b85c-4a95-a01a-454b7396bf91.jpg",
			"price": "3120/箱",
			"pronum": "LM-2020018",
			"title": "老树贡眉"
		},
		{
			"id": "79550af26050b9d00a6375ad20319360",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/7cbba642-5338-4a34-9f67-9e83ad122005.jpg",
			"price": "936/盒",
			"pronum": "LM-201810",
			"title": "贡眉散茶"
		},
		{
			"id": "28ee4e3e60507a2f0af735f57087eaa5",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/5d094288-2503-48c1-b145-e6270bccc774.jpg",
			"price": "1949/饼",
			"pronum": "LM-201868",
			"title": "改革开放四十周年纪念茶"
		},
		{
			"id": "79550af260ab47ef19ae99816311552f",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/611f7546-7663-4d57-a131-df6be5932d68.jpg",
			"price": "23610/箱",
			"pronum": "LM-2021010",
			"title": "白毫银针"
		},
		{
			"id": "79550af260507cec0a59d68c0fdb5323",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/b9b62c3a-f8e4-47f6-9260-9a24128890ca.jpg",
			"price": "1799/罐",
			"pronum": "LM-2020011",
			"title": "老茶牡丹（2006年）"
		},
		{
			"id": "28ee4e3e6050b4320b00e94b00e1fb56",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/96047f75-6840-4594-8d1d-773965487e9a.jpg",
			"price": "1466/饼",
			"pronum": "LM-2019033",
			"title": "有机寿眉"
		},
		{
			"id": "b00064a76050b3cd0a550ad50b996430",
			"picurl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/996656b3-556e-4cbc-9f37-55429032464c.jpg",
			"price": "328/袋",
			"pronum": "J-LM201728",
			"title": "寒露茶"
		}
	];

	//获取云数据库用户信息返回
	// var users = db.collection('users').get();

	var {
		name,
		age,
		sex,
		phone,
		email,
		address
	} = event;
	//添加用户信息到云数据库
	var addRes = await db.collection('users').add({
		name,
		age,
		sex,
		phone,
		email,
		address
	})

	//返回数据给客户端
	return addRes;
};
