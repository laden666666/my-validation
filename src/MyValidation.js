/**
 * Created by njz on 17/1/3.
 */
import FormValidation from './FormValidation';
import Rule from './Rule';
import EasyResult from './EasyResult';
import ruleLib from './RuleLib';

//新注册的规则
var newRuleLib = [];

var MyValidation = function () {
    this.$formValidation = new FormValidation(ruleLib.concat(newRuleLib));
}

//注册新规则
MyValidation.prototype.registerRule = function (name, validation, msg) {
    var newRule = new Rule(name, validation, msg);
    this.$formValidation.registerRule(newRule);
}

/**
 * 校验规则
 * @param ruleStrings        有三种形式 1:{name: ruleString} 2.[{name:name, rule:ruleString}...] 3.字符串
 * @param values
 * @param isStringPath
 */
MyValidation.prototype.validation = function (ruleStringJson, values, isStringPath) {
    return this.$formValidation.validation(ruleStringJson, values, isStringPath);
}

//构建一个简化的返回结果
MyValidation.prototype.result = function (result, msg) {
    return new EasyResult(result, msg);
}

//分析结果,返回是一个boolean型
MyValidation.prototype.analyseResult = function (result) {
    if(Object.prototype.toString.call(result) === '[object Array]'){
        return result.reduce((result, item)=>{
            return item.result && result;
        },true);
    } else {
        var array = [];
        for(let key in result){
            array.push(result[key]);
        }

        return array.map((item)=>{
            return this.analyseResult(item);
        }).reduce((result, item)=>{
            return item && result;
        },true)
    }
}



/**
 * 创建一个默认的MyValidation实例,并提供基于构建者模式的构建功能
 */
var MyValidationFactory = new MyValidation();

//注册新规则
MyValidationFactory.registerRule = function (name, validation, msg) {
    var newRule = new Rule(name, validation, msg);
    newRuleLib.push(newRule);
    this.$formValidation.registerRule(newRule);
}

//构建一个新的实例
MyValidationFactory.build = function () {
    return new FormValidation();
}


module.exports = MyValidationFactory;