import Rule from './Rule';
import EasyResult from './EasyResult';
import RuleResult from './RuleResult';

/**
 * 校验
 */
function FormValidation(rules = []) {
    this.rules = {};
    var that = this;

    rules.forEach((rule)=>{
        that.rules[rule.name] = rule;
    });
}

/**
 * 注册新规则
 * @param validationMap
 */
FormValidation.prototype.registerRule = function(rule){
    if(rule instanceof Rule){
        this.rules[rule.name] = rule;
    }
}

/**
 * 移除规则
 * @param validationMap
 */
FormValidation.prototype.removeRule = function(rule){
    if(rule instanceof Rule){
        delete this.rules[rule.name];
    } else if(typeof rule == 'string'){
        delete this.rules[rule];
    }
}

/**
 * 校验函数,根据校验规则字符串、校验函数,校验
 * @param value             要校验的对象值(必须是个字符串)
 * @param object            要校验的对象
 * @param ruleString        校验规则字符串,格式必须有是"校验规则名[参数1,[参数2]...]"或者是"校验规则名"。多个规则会用;分隔。分号也是转义字符,;,对应,;;对应分号
 */
FormValidation.prototype.$validation = function (value, object, ruleString) {

    //将转义的两个特殊字符替换掉
    var comma = "comma" + Math.random();
    if(ruleString.indexOf(comma) >= 0){
        comma = "comma" + Math.random();
    }
    var semicolon = "semicolon" + Math.random();
    if(ruleString.indexOf(comma) >= 0){
        semicolon = "semicolon" + Math.random();
    }
    ruleString = ruleString.replace(/;;/g,semicolon).replace(/;,/g,comma);

    //根据;号将字符串拆开
    var ruleStrings = ruleString.split(";");

    var ruleResults = [];
    for(var ruleStringItem of ruleStrings) {
        //取出规则名
        var getRegex = /^(\w+)\[(\S+)\]$|^(\w+)$/;
        var results = getRegex.exec(ruleStringItem);
        var ruleName = results[1] || results[0];

        //参数列表
        var parameter = results[2] ? results[2].split(",") : [];
        //将已经转义的字符串转义回来
        parameter = parameter.map(function (str) {
            return str.replace(new RegExp(comma, "g"), ",").replace(new RegExp(semicolon, "g"), ";");
        })

        //如果注册了此规则,用注册的规则校验此value
        var rule = this.rules[ruleName];
        if (rule && typeof rule.validation == 'function') {
            var result = rule.validation(value, object, ...parameter);

            //如果result是EasyResul,转为RuleResult返回
            if (result instanceof EasyResult) {
                ruleResults.push(new RuleResult(value, object, result.result, result.failMessage)) ;
            } else if (result === true) {
                ruleResults.push(new RuleResult(value, object, true, ''));
            } else {
                ruleResults.push(new RuleResult(value, object, false,
                    typeof rule.msg == "function" ? rule.msg(value, object, ...parameter) : rule.msg));
            }
        }
    }

    return ruleResults;
}

export default FormValidation;