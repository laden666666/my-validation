import Rule from './Rule';

/**
 * 必填规则
 */
var required = new Rule("required", function (value) {
    return !!value;
},"必须填写");

/**
 * 最少输入字符数
 */
var minSize = new Rule("minSize", function (value, object, count) {
    return !!value && value.length >= parseInt(count);
},function (value, object, count) {
    return "最少输入" + count + "个字符数";
});

/**
 * 最多输入字符数
 */
var maxSize = new Rule("maxSize", function (value, object, count) {
    return !!value && value.length <= parseInt(count);
},function (value, object, count) {
    return "最多输入" + count + "个字符数";
});

/**
 * 	最小值
 */
var min = new Rule("min", function (value, object, number) {
    if(!value || !/^[-+]?\d+(\.\d+)?$/.test(value)){
        return false
    }
    return parseFloat(value) >= parseFloat(number);
},function (value, object, number) {
    return "不能小于" + number;
});


/**
 * 	最大值
 */
var max = new Rule("max", function (value, object, number) {
    if(!value || !/^[-+]?\d+(\.\d+)?$/.test(value)){
        return false
    }
    return parseFloat(value) <= parseFloat(number);
},function (value, object, number) {
    return "不能大于" + number;
});

/**
 * 	验证数字
 */
var number = new Rule("number", function (value, object) {
    return !!value && /^[-+]?\d+(\.\d+)?$/.test(value);
}, "必须是数字");

/**
 * 	验证整数
 */
var integer = new Rule("integer", function (value, object) {
    return !!value && /^[-+]?\d+$/.test(value);
}, "必须是整数");


/**
 * 提供的默认的校验库
 * @constructor
 */
export default [required,max,min,maxSize,minSize,number,integer]