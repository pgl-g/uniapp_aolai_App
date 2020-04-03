var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js')
var user = require('../db/userSql.js')
//验证码
let code = '';
//接入短信的sdk
var QcloudSms = require("qcloudsms_js");

//设置跨域访问
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


// 注册 ===> 增加一条数据
router.post('/api/addUser', function(req, res, next) {
	// 前端给后端的数据
	let params = {
		userName : req.body.userName,
		userCode : req.body.code
	}
	if( params.userCode == code ) {
		connection.query(user.insertData(params),function(error, results, fields){
			res.send({
				data:{
					success:true,
					msg:"注册成功"
				}
			})
			
		})
	}
});



//发送验证码
router.get('/api/code', function(req, res, next) {
	//前端给后端的数据
	let params = {
		userName : req.body.userName
	};
	// 短信应用 SDK AppID
	var appid = 1400187558;  // SDK AppID 以1400开头
	// 短信应用 SDK AppKey
	var appkey = "dc9dc3391896235ddc2325685047edc7";
	// 需要发送短信的手机号码
	var phoneNumbers = [params.userName];
	// 短信模板 ID，需要在短信控制台中申请
	var templateId = 298000;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
	// 签名
	var smsSign = "三人行慕课";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
	// 实例化 QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
	function callback(err, ress, resData) {
	  if (err) {
	      console.log("err: ", err);
	  } else {
		  code = ress.req.body.params[0];
	      res.send({
			  data:{
				  success:true,
				  code:code
			  }
		  })
	  }
	}
	var ssender = qcloudsms.SmsSingleSender();
	var paramss = [  Math.floor( Math.random()*(9999-1000))+1000 ];//发送的验证码
	ssender.sendWithParam("86", phoneNumbers[0], templateId,
	paramss, smsSign, "", "", callback); 
});


// 检测数据库中手机号存在不存在
router.post('/api/registered', function(req, res, next) {
	let params = {
		userName : req.body.phone
	}
	// 查询手机号是否存在
	connection.query(user.queryUserName(params), function(error, results, fields) {
		if( results.length > 0 ) {
			res.send({
				data: {
					success:false,
					msg:"手机号已注册"
				}
			})
		}else {
			res.send({
				data:{
					success:true
				}
			})
		}
	})
})





//用户登录
router.post('/api/login', function(req, res, next) {

	//前端给后端的数据
	let params = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	
	
	//查询用户名或者密码存在不存在
	connection.query(user.queryUserName(params), function(error, results, fields) {
		if (results.length > 0) {
			connection.query(user.queryUserPwd(params), function(err, result) {
				if (result.length > 0) {
					res.send({
						data: {
							success: true,
							msg: "登录成功",
							data: result[0]
						}
					})
				} else {
					res.send({
						data: {
							success: false,
							msg: "密码不正确"
						}
					})
				}
			})
		} else {
			res.send({
				data: {
					success: false,
					msg: "用户名或手机号不存在"
				}
			})
		}
	})
});



// 商品id
router.get('/api/goods/id', function(req, res, next) {
	let id = req.query.id
	connection.query("select * from search_key where id=" + id + "",
		function(error, results,
			fields) {
			if (error) throw error;
			// 给前端返回
			res.send({
				code: "0",
				data: results
			})
		})
});

// 分类的数据
router.get('/api/goods/list', function(req, res, next) {
	res.json({
		code: 0,
		data: [{
				id: 1,
				name: '家居家纺',
				data: [{
						name: "家纺",
						list: [{
								id: 1,
								imgUrl: '../../static/img/Children1.jpg',
								name: '毛巾/浴巾'
							},
							{
								id: 2,
								imgUrl: '../../static/img/Children2.jpg',
								name: '枕头'
							}
						]
					},
					{
						name: "生活日用",
						list: [{
								id: 1,
								imgUrl: '../../static/img/Children1.jpg',
								name: '浴室用品'
							},
							{
								id: 2,
								imgUrl: '../../static/img/Children2.jpg',
								name: '洗晒/熨烫'
							}
						]
					}
				]
			},
			{
				id: 2,
				name: '女装',
				data: [{
						name: "裙装/套装",
						list: [{
								id: 1,
								imgUrl: '../../static/img/Children1.jpg',
								name: '半身裙'
							},
							{
								id: 2,
								imgUrl: '../../static/img/Children2.jpg',
								name: '连衣裙'
							}
						]
					},
					{
						name: "上衣",
						list: [{
								id: 1,
								imgUrl: '../../static/img/Children1.jpg',
								name: 'T恤/打底衫'
							},
							{
								id: 2,
								imgUrl: '../../static/img/Children2.jpg',
								name: '衬衫'
							}
						]
					}
				]
			}
		]
	})
})



// 搜索页面的关键词数据请求
router.get('/api/goods/search', function(req, res, next) {
	// desc 升序 asc 降序

	// 解构获取对象的key 传给后端  
	let [goodsName, orderName] = Object.keys(req.query);
	let name = req.query.name
	let order = req.query[orderName]


	connection.query("select * from search_key where name like '%" + name + "%' order by " + orderName + " " + order +
		"  ",
		function(error, results,
			fields) {
			if (error) throw error;
			// 给前端返回
			res.send({
				code: "0",
				data: results
			})
		})
})
// 首页推荐数据第一次加载的数据
router.get('/api/index_list/1/data/2', function(req, res, next) {
	res.json({
		"code": 0,
		data: [{
			type: "commodityList",
			data: [{
					id: '1',
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '2',
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '3',
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '4',
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]

	})
})
// 首页运动户外第二次触底加载的数据
router.get('/api/index_list/2/data/3', function(req, res, next) {
	res.json({
		"code": 0,
		data: [{
			type: "commodityList",
			data: [{
					id: '1',
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '2',
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '3',
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '4',
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]

	})
})

// 首页运动户外第一次触底的数据
router.get('/api/index_list/2/data/2', function(req, res, next) {
	res.json({
		"code": 0,
		data: [{
			type: "commodityList",
			data: [{
					id: '1',
					imgUrl: "../../static/img/commodity1.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '2',
					imgUrl: "../../static/img/commodity2.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '3',
					imgUrl: "../../static/img/commodity3.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				},
				{
					id: '4',
					imgUrl: "../../static/img/commodity4.jpg",
					name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice: "299",
					oprice: "659",
					discount: "5.2"
				}
			]
		}]

	})
})

// 首页运动户外第一次加载的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
	res.json({
		"code": 0,
		"data": [{
				type: 'bannerList',
				bigUrl: '../../static/img/banner1(2).jpg'
			},
			{
				type: 'iconsList',
				data: [{
						id: '1',
						icons: '../../static/img/icons1.png',
						name: '运动鞋'
					},
					{
						id: '2',
						icons: '../../static/img/icons2.png',
						name: '运动鞋'
					},
					{
						id: '3',
						icons: '../../static/img/icons3.png',
						name: '运动鞋'
					},
					{
						id: '4',
						icons: '../../static/img/icons4.png',
						name: '运动鞋'
					},
					{
						id: '5',
						icons: '../../static/img/icons5.png',
						name: '运动鞋'
					},
					{
						id: '6',
						icons: '../../static/img/icons6.png',
						name: '运动鞋'
					},
					{
						id: '7',
						icons: '../../static/img/icons7.png',
						name: '运动鞋'
					},
					{
						id: '8',
						icons: '../../static/img/icons8.png',
						name: '运动鞋'
					}
				]
			},
			{
				type: 'hotList',
				data: [{
						id: '1',
						imgUrl: '../../static/img/hot1.jpg',
						title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
						newprice: '299',
						oldprice: '566',
						discount: '5.2'
					},
					{
						id: '2',
						imgUrl: '../../static/img/hot2.jpg',
						title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
						newprice: '299',
						oldprice: '566',
						discount: '5.2'
					},
					{
						id: '3',
						imgUrl: '../../static/img/hot3.jpg',
						title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
						newprice: '299',
						oldprice: '566',
						discount: '5.2'
					}
				]
			},
			{
				type: "commodityList",
				data: [{
						id: '1',
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '2',
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '3',
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '4',
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: 'shopList',
				data: [{
					bigimgUrl: '../../static/img/shop.jpg',
					data: [{
							id: '1',
							imgUrl: '../../static/img/shop1.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '2',
							imgUrl: '../../static/img/shop2.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '3',
							imgUrl: '../../static/img/shop3.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '4',
							imgUrl: '../../static/img/shop4.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '5',
							imgUrl: '../../static/img/shop1.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '6',
							imgUrl: '../../static/img/shop2.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '7',
							imgUrl: '../../static/img/shop3.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '8',
							imgUrl: '../../static/img/shop4.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						}
					]
				}]
			}
		]
	})
});

// 首页服饰内衣第一次加载的数据
router.get('/api/index_list/3/data/1', function(req, res, next) {
	res.json({
		"code": 0,
		"data": [{
				type: 'bannerList',
				bigUrl: '../../static/img/banner1(2).jpg'
			},
			{
				type: 'iconsList',
				data: [{
						id: '1',
						icons: '../../static/img/icons1.png',
						name: '服饰内衣'
					},
					{
						id: '2',
						icons: '../../static/img/icons2.png',
						name: '服饰内衣'
					},
					{
						id: '3',
						icons: '../../static/img/icons3.png',
						name: '服饰内衣'
					},
					{
						id: '4',
						icons: '../../static/img/icons4.png',
						name: '服饰内衣'
					},
					{
						id: '5',
						icons: '../../static/img/icons5.png',
						name: '服饰内衣'
					},
					{
						id: '6',
						icons: '../../static/img/icons6.png',
						name: '服饰内衣'
					},
					{
						id: '7',
						icons: '../../static/img/icons7.png',
						name: '服饰内衣'
					},
					{
						id: '8',
						icons: '../../static/img/icons8.png',
						name: '服饰内衣'
					}
				]
			},
			{
				type: 'hotList',
				data: [{
						id: '1',
						imgUrl: '../../static/img/hot1.jpg',
						title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
						newprice: '299',
						oldprice: '566',
						discount: '5.2'
					},
					{
						id: '2',
						imgUrl: '../../static/img/hot2.jpg',
						title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
						newprice: '299',
						oldprice: '566',
						discount: '5.2'
					},
					{
						id: '3',
						imgUrl: '../../static/img/hot3.jpg',
						title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
						newprice: '299',
						oldprice: '566',
						discount: '5.2'
					}
				]
			},
			{
				type: "commodityList",
				data: [{
						id: '1',
						imgUrl: "../../static/img/commodity1.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '2',
						imgUrl: "../../static/img/commodity2.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '3',
						imgUrl: "../../static/img/commodity3.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: '4',
						imgUrl: "../../static/img/commodity4.jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			},
			{
				type: 'shopList',
				data: [{
					bigUrl: '../../static/img/shop.jpg',
					data: [{
							id: '1',
							imgUrl: '../../static/img/shop1.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '2',
							imgUrl: '../../static/img/shop2.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '3',
							imgUrl: '../../static/img/shop3.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '4',
							imgUrl: '../../static/img/shop4.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '5',
							imgUrl: '../../static/img/shop1.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '6',
							imgUrl: '../../static/img/shop2.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '7',
							imgUrl: '../../static/img/shop3.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						},
						{
							id: '8',
							imgUrl: '../../static/img/shop4.jpg',
							title: 'Lucky Qzasec女士宽松显露褶皱灯笼袖衬衫k19237',
							newprice: '299',
							oldprice: '566',
							discount: '5.2'
						}
					]
				}]
			}
		]
	})
});



// 首页推荐的数据
router.get("/api/index_list/data", function(req, res, next) {
	res.send({
		"code": 0,
		"data": {
			topBar: [{
					id: '1',
					name: '推荐'
				},
				{
					id: '2',
					name: '运动户外'
				},
				{
					id: '3',
					name: '服饰内衣'
				},
				{
					id: '4',
					name: '鞋靴箱包'
				},
				{
					id: '5',
					name: '美妆个护'
				},
				{
					id: '6',
					name: '家居数码'
				},
				{
					id: '7',
					name: '食品母婴'
				}
			],
			data: [{
					type: "swiperList",
					data: [{
							imgUrl: '../../static/img/swiper1.jpg'
						},
						{
							imgUrl: '../../static/img/swiper2.jpg'
						},
						{
							imgUrl: '../../static/img/swiper3.jpg'
						}
					]
				},
				{
					type: "recommendList",
					data: [{
							bigUrl: "../../static/img/Children.jpg",
							data: [{
									imgUrl: "../../static/img/Children1.jpg"
								},
								{
									imgUrl: "../../static/img/Children2.jpg"
								},
								{
									imgUrl: "../../static/img/Children3.jpg"
								}
							]
						},
						{
							bigUrl: "../../static/img/Furnishing.jpg",
							data: [{
									imgUrl: "../../static/img/Furnishing1.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing2.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing3.jpg"
								}
							]
						}
					]
				},
				{
					type: "commodityList",
					data: [{
							id: '1',
							imgUrl: "../../static/img/commodity1.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: '2',
							imgUrl: "../../static/img/commodity2.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: '3',
							imgUrl: "../../static/img/commodity3.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						},
						{
							id: '4',
							imgUrl: "../../static/img/commodity4.jpg",
							name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice: "299",
							oprice: "659",
							discount: "5.2"
						}
					]
				}
			]
		}
	})
});


module.exports = router;
