
var verifyNum1 = /^[0-9]*$/, //只能输入数字
	verifyNum2 = /^[0-9]+(.[0-9]{1,3})?$/, //只能输入有1~3位小数的正实数
	verifyNum3 = /^[1-9][0-9]*$/, //只能输入非零的正整数
	verifyNum4 = /^[0-9]+\.{0,1}[0-9]{0,2}$/, //整数或者小数
	verifyNum5 = /^[0-9]+(.[0-9]{1})?$/, //只能输入有一位小数的正实数
	verifyZh = /^[\u4e00-\u9fa5]{0,}$/, //只能输入汉字
	verifyEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, //Email地址
	verifyCard = /\d{15}|\d{18}/, //身份证
	verifyTel = /^1[34578]\d{9}$/, //手机号
	verifySpechars = new RegExp("[`~@#$%&*\\[\\]<>？！￥（）{}]"),
	verifyUrl = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/; //url

// 
let number = (rule, value, callback) => {
	if (!value) {
		callback();
	}
	setTimeout(() => {
		if (!verifyNum3.test(value)) {
			return callback(new Error('请输入非零的正整数'));
		}else{
			callback();
		}
	}, 1000);
};

// 整数小数
let integer_decimals = (rule, value, callback) => {
	if (!value) {
		callback();
	}
	setTimeout(() => {
		if (!verifyNum2.test(value)) {
			return callback(new Error('请输入数字，小数点不能超过三位'));
		}else{
			callback();
		}
	}, 1000);
};

// 时长
let duration = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('时长不能为空'));
	}
	setTimeout(() => {
		if (!verifyNum3.test(value)) {
			callback(new Error('请输入数字值'));
		} else {
			callback();
		}
	}, 1000);
};

// 评分
let score = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('评分不能为空'));
	}
	setTimeout(() => {
		if (!verifyNum5.test(value)) {
			callback(new Error('请输入数字值，并小数点不能超过一位'));
		} else {
			callback();
		}
	}, 1000);
};

// 类型
let type = (rule, value, callback) => {
	if (value.length <= 0) {
		return callback(new Error('类型不能为空'));
	}else{
		callback();
	}
};

// Url
let film_url = (rule, value, callback) => {
	setTimeout(() => {
		if (!verifyUrl.test(value)) {
			return callback(new Error('Url格式不正确'));
		} else {
			callback();
		}
	}, 1000);
	
};

// 手机号
let tel_num = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('手机号不能为空'));
	}
	setTimeout(() => {
		if (!verifyTel.test(value)) {
			return callback(new Error('手机号格式不正确'));
		} else {
			callback();
		}
	}, 1000);
};

// 时间选择器
let time_picker = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('请选择时间'));
	}else{
		callback();
	}
};

// 禁止特殊字符
let spechars = (rule, value, callback) => {
	setTimeout(() => {
		if (verifySpechars.test(value)) {
			return callback(new Error('禁止输入非法字符'));
		} else {
			callback();
		}
	}, 1000);
};

export { number, integer_decimals, duration, score, type, film_url, tel_num, time_picker, spechars };
