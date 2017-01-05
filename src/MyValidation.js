/**
 * Created by njz on 17/1/3.
 */
import FormValidation from './FormValidation';
import Rule from './Rule';
import EasyResult from './EasyResult';
import ruleLib from './RuleLib';

var formValidation = new FormValidation(ruleLib);
var MyValidation = {};

//注册新规则
MyValidation.registerRule = function (name, validation, msg) {
    formValidation.registerRule(new Rule(name, validation, msg));
}

/**
 *
 * @param ruleStrings        有三种形式 1:{name: ruleString} 2.[{name:name, rule:ruleString}...] 3.字符串
 * @param values
 * @param isStringPath
 */
MyValidation.validation = function (ruleStringJson, values, isStringPath) {
    //ruleStringJson是字符串
    var isString = false;

    //将ruleStrings的两种形式都转为 {name: {name:name, rule:ruleString}}的形式
    var maps = {};
    var resultMaps = {};
    if(Object.prototype.toString.call(ruleStringJson) === '[object Array]'){
        //如果是数组形式
        for (var index in ruleStringJson){
            var item = ruleStringJson[index];
            if(item && item.name && item.rule){
                maps[item.name] = item;
            }
        }
    } else if(typeof ruleStringJson == "string") {
        isString = true;
        maps['name'] = {
            rule : ruleStringJson,
        };
        values = {name : values};
    } else {
        for (var name in ruleStringJson){
            var ruleString = ruleStringJson[name]

            if(ruleString){
                maps[name] = {
                    name : name,
                    rule : ruleString,
                };
            }
        }
    }

    //循环遍历,然后求出结果数组
    for (var name in maps){
        var value = isStringPath ? getValueByStringPath(values, name) : values[name];

        resultMaps[name] = formValidation.$validation(value, maps[name], maps[name].rule);
    }

    if(isString){
        return resultMaps["name"];
    } else {
        return resultMaps;
    }
}

//构建一个简化的返回结果
MyValidation.result = function (result, msg) {
    return new EasyResult(result, msg);
}

function getValueByStringPath(json, stringPath) {
    if(!json){
        return "";
    }

    var temp = json, path;
    var paths = stringPath.split(".");
    for (path = paths.shift();path; path = paths.shift()){
        temp = temp[path];
        if(!temp){
            return "";
        }
    }
    return temp;
}

module.exports = MyValidation;