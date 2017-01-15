import Rule from './Rule';

//几种常用正则
var phoneRegex = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
var mobileRegex = /^1\d{10}$/;
var numberRegex = /^[-+]?\d+(\.\d+)?$/;
var integerRegex = /^[-+]?\d+$/;

/**
 * 必填规则
 */
var required = new Rule("required", function (value, object, ...fitlers) {
    return !!value && fitlers.filter((item)=>item + "" === value).length == 0;
},"必须填写");

/**
 * 最少输入字符数
 */
var minSize = new Rule("minSize", function (value = "", object, count) {
    return value === "" || value.length >= parseInt(count);
},function (value, object, count) {
    return "最少输入" + count + "个字符数";
});

/**
 * 最多输入字符数
 */
var maxSize = new Rule("maxSize", function (value = "", object, count) {
    return value === "" || value.length <= parseInt(count);
},function (value, object, count) {
    return "最多输入" + count + "个字符数";
});

/**
 * 	最小值
 */
var min = new Rule("min", function (value = "", object, number) {
    if(value === ""){
        return true;
    } else if(!numberRegex.test(value)){
        return false
    }
    return parseFloat(value) >= parseFloat(number);
},function (value, object, number) {
    return "不能小于" + number;
});


/**
 * 	最大值
 */
var max = new Rule("max", function (value = "", object, number) {
    if(value === ""){
        return true;
    } else if(!numberRegex.test(value)){
        return false
    }
    return parseFloat(value) <= parseFloat(number);
},function (value, object, number) {
    return "不能大于" + number;
});

/**
 * 	验证数字
 */
var number = new Rule("number", function (value = "", object) {
    return value === "" || numberRegex.test(value);
}, "必须是数字");

/**
 * 	验证整数
 */
var integer = new Rule("integer", function (value = "", object) {
    return value === "" || integerRegex.test(value);
}, "必须是整数");

/**
 * 	验证整数
 */
var regex = new Rule("regex", function (value = "", object, regex, config) {
    return value === "" || new RegExp(regex, config).test(value);
}, "格式错误");

/**
 * 	手机校验或电话
 */
var mobileOrPhone = new Rule("mobileOrPhone", function (value = "", object) {
    return value === "" || phoneRegex.test(value) || mobileRegex.test(value);
}, "电话号码或者手机号格式错误");

/**
 * 	电话校验
 */
var phone = new Rule("phone", function (value = "", object) {
    return value === "" || phoneRegex.test(value);
}, "电话号码格式错误");

/**
 * 	手机校验
 */
var mobilePhone = new Rule("mobilePhone", function (value = "", object) {
    return value === "" || mobileRegex.test(value);
}, "手机号格式错误");




/**
 * 提供的默认的校验库
 * @constructor
 */
export default [required,max,min,maxSize,minSize,number,integer,regex,mobileOrPhone,phone,mobilePhone]