// 自定义通用校验方法，其中validate**方法适用于element UI及iView等
let validate= {
	version:"1.0",
	//是否是移动端
	isMobile:function(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent);
	},
	//是否是微信,(还可判断是否存在WeixinJSBridge,需在WeixinJSBridgeReady事件后)
	isWechat:function(){
		return /micromessenger/i.test(navigator.userAgent) || typeof navigator.wxuserAgent !== 'undefined';
	},
	//IP地址
	isIP:function(value){
		return /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
	},
	validateIP:(rule, value, callback) => {
		if (!validate.isIP(value)) {
			callback(new Error('请输入正确的IP'));
		} else{
			callback();
		}
	},
	//身份证
	isIdCardNo:function(value){
		var birthday=new Date(value.substr(6,4)+"-"+value.substr(10,2)+"-"+value.substr(12,2)); //不考虑15位身份证，目前有效身份证均为18位
		return /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/.test(value)&&(birthday<new Date());
	},
	validateIdCardNo:(rule, value, callback) => {
		if (!validate.isIdCardNo(value)) {
			callback(new Error('请输入正确的身份证号码'));
		} else{
			callback();
		}
	},
	//车牌号
	isPlateNo:function(value){
		return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(value);
	},
	validatePlateNo:(rule, value, callback) => {
		if (!validate.isPlateNo(value)) {
			callback(new Error('请输入正确的车牌号'));
		} else{
			callback();
		}
	},
	//联系手机/电话
	isPhone:function(value){
		var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
		return mobile.test(value)||tel.test(value);
	},
	validatePhone:(rule, value, callback) => {
		if (!validate.isPhone(value)) {
			callback(new Error('请输入正确的手机/电话号码'));
		} else{
			callback();
		}
	},
	//QQ号码
	isQQ:function(value){
		return /^[1-9]\d{4,10}$/.test(value);
	},
	validateQQ:(rule, value, callback) => {
		if (!validate.isQQ(value)) {
			callback(new Error('请输入正确的QQ号码'));
		} else{
			callback();
		}
	},
	//字母开头，长度在6-12之间，只能包含字符、数字和下划线的密码,按需修改。
	isPassword:function(value){
		return /^[a-zA-Z]\w{5,12}$/.test(value);
	},
	validatePassword:(rule, value, callback) => {
		if (!validate.isPassword(value)) {
			callback(new Error('只能包含字符、数字和下划线，且以字母开头，长度在6-12之间'));
		} else{
			callback();
		}
	},
	//一个或多个中文
	isChinese:function(value){
		return /^[\u4e00-\u9fa5]+$/.test(value);
	},
	validateChinese:(rule, value, callback) => {
		if (!validate.isChinese(value)) {
			callback(new Error('请输入中文'));
		} else{
			callback();
		}
	},
	//网址
	isUrl:function(value){
		return /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i.test(value)
	},
	validateUrl:(rule, value, callback) => {
		if (!validate.isUrl(value)) {
			callback(new Error('请输入正确的网址'));
		} else{
			callback();
		}
	},
	isEmail:function(value){
		return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
	},
	validateEmail:(rule, value, callback) => {
		if (!validate.isEmail(value)) {
			callback(new Error('请输入正确的邮箱地址'));
		} else{
			callback();
		}
	},
	getStrLength:function(value){
		return value.replace(/[^\x00-\xff]/g,"aa").length; //将双字节字符替换为单字节字符
	}
};

// ES6
export default validate;
// moduel.export=validate;