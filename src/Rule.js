/**
 *
 * @param name
 * @param validation   校验函数、参数是校验
 * @param msg
 * @constructor
 */
function Rule(name, validation, msg) {
    if(typeof name !== 'string'){
        throw new TypeError("校验规则名字必须给定");
    }
    if(typeof validation !== 'function'){
        throw new TypeError("校验规则校验函数必须给定");
    }
    if(typeof msg !== 'string' && typeof msg !== 'function'){
        throw new TypeError("校验规则错误提示必须给定");
    }

    this.name = name;
    this.validation = validation;
    this.msg = msg;
}

export default Rule;