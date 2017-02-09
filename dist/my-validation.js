(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myValidation"] = factory();
	else
		root["myValidation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _FormValidation = __webpack_require__(2);

	var _FormValidation2 = _interopRequireDefault(_FormValidation);

	var _Rule = __webpack_require__(3);

	var _Rule2 = _interopRequireDefault(_Rule);

	var _EasyResult = __webpack_require__(4);

	var _EasyResult2 = _interopRequireDefault(_EasyResult);

	var _RuleLib = __webpack_require__(6);

	var _RuleLib2 = _interopRequireDefault(_RuleLib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//新注册的规则
	/**
	 * Created by njz on 17/1/3.
	 */
	var newRuleLib = [];

	var MyValidation = function MyValidation() {
	    this.$formValidation = new _FormValidation2.default(_RuleLib2.default.concat(newRuleLib));
	};

	//注册新规则
	MyValidation.prototype.registerRule = function (name, validation, msg) {
	    var newRule = new _Rule2.default(name, validation, msg);
	    this.$formValidation.registerRule(newRule);
	};

	/**
	 * 校验规则
	 * @param ruleStrings        有三种形式 1:{name: ruleString} 2.[{name:name, rule:ruleString}...] 3.字符串
	 * @param values
	 * @param isStringPath
	 */
	MyValidation.prototype.validation = function (ruleStringJson, values, isStringPath) {
	    return this.$formValidation.validation(ruleStringJson, values, isStringPath);
	};

	//构建一个简化的返回结果
	MyValidation.prototype.result = function (result, msg) {
	    return new _EasyResult2.default(result, msg);
	};

	//分析结果,返回是一个boolean型
	MyValidation.prototype.analyseResult = function (result) {
	    var _this = this;

	    if (Object.prototype.toString.call(result) === '[object Array]') {
	        return result.reduce(function (result, item) {
	            return item.result && result;
	        }, true);
	    } else {
	        var array = [];
	        for (var key in result) {
	            array.push(result[key]);
	        }

	        return array.map(function (item) {
	            return _this.analyseResult(item);
	        }).reduce(function (result, item) {
	            return item && result;
	        }, true);
	    }
	};

	/**
	 * 创建一个默认的MyValidation实例,并提供基于构建者模式的构建功能
	 */
	var MyValidationFactory = new MyValidation();

	//注册新规则
	MyValidationFactory.registerRule = function (name, validation, msg) {
	    var newRule = new _Rule2.default(name, validation, msg);
	    newRuleLib.push(newRule);
	    this.$formValidation.registerRule(newRule);
	};

	//构建一个新的实例
	MyValidationFactory.build = function () {
	    return new _FormValidation2.default(_RuleLib2.default.concat(newRuleLib));
	};

	module.exports = MyValidationFactory;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Rule = __webpack_require__(3);

	var _Rule2 = _interopRequireDefault(_Rule);

	var _EasyResult = __webpack_require__(4);

	var _EasyResult2 = _interopRequireDefault(_EasyResult);

	var _RuleResult = __webpack_require__(5);

	var _RuleResult2 = _interopRequireDefault(_RuleResult);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * 校验
	 */
	function FormValidation() {
	    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    this.rules = {};
	    var that = this;

	    rules.forEach(function (rule) {
	        that.rules[rule.name] = rule;
	    });
	}

	/**
	 * 注册新规则
	 * @param validationMap
	 */
	FormValidation.prototype.registerRule = function (rule) {
	    if (rule instanceof _Rule2.default) {
	        this.rules[rule.name] = rule;
	    }
	};

	/**
	 * 移除规则
	 * @param validationMap
	 */
	FormValidation.prototype.removeRule = function (rule) {
	    if (rule instanceof _Rule2.default) {
	        delete this.rules[rule.name];
	    } else if (typeof rule == 'string') {
	        delete this.rules[rule];
	    }
	};

	/**
	 * 校验函数,根据校验规则字符串、校验函数,校验
	 * @param value             要校验的对象值(必须是个字符串)
	 * @param object            要校验的对象
	 * @param ruleString        校验规则字符串,格式必须有是"校验规则名[参数1,[参数2]...]"或者是"校验规则名"。多个规则会用;分隔。分号也是转义字符,;,对应,;;对应分号
	 */
	FormValidation.prototype.$validation = function (value, object, ruleString) {

	    //将转义的两个特殊字符替换掉
	    var comma = "comma" + Math.random();
	    if (ruleString.indexOf(comma) >= 0) {
	        comma = "comma" + Math.random();
	    }
	    var semicolon = "semicolon" + Math.random();
	    if (ruleString.indexOf(comma) >= 0) {
	        semicolon = "semicolon" + Math.random();
	    }
	    ruleString = ruleString.replace(/;;/g, semicolon).replace(/;,/g, comma);

	    //根据;号将字符串拆开
	    var ruleStrings = ruleString.split(";");

	    var ruleResults = [];
	    for (var ruleStringItem in ruleStrings) {
	        //取出规则名
	        var getRegex = /^(\w+)\[(\S+)\]$|^(\w+)$/;
	        var results = getRegex.exec(ruleStrings[ruleStringItem]);
	        var ruleName = results[1] || results[0];

	        //参数列表
	        var parameter = results[2] ? results[2].split(",") : [];
	        //将已经转义的字符串转义回来
	        parameter = parameter.map(function (str) {
	            return str.replace(new RegExp(comma, "g"), ",").replace(new RegExp(semicolon, "g"), ";");
	        });

	        //如果注册了此规则,用注册的规则校验此value
	        var rule = this.rules[ruleName];
	        if (rule && typeof rule.validation == 'function') {
	            var result = rule.validation.apply(rule, [value, object].concat(_toConsumableArray(parameter)));

	            //如果result是EasyResul,转为RuleResult返回
	            if (result instanceof _EasyResult2.default) {
	                ruleResults.push(new _RuleResult2.default(value, object, result.result, result.failMessage));
	            } else if (result === true) {
	                ruleResults.push(new _RuleResult2.default(value, object, true, ''));
	            } else {
	                ruleResults.push(new _RuleResult2.default(value, object, false, typeof rule.msg == "function" ? rule.msg.apply(rule, [value, object].concat(_toConsumableArray(parameter))) : rule.msg));
	            }
	        }
	    }

	    return ruleResults;
	};

	/**
	 *
	 * @param ruleStrings        有三种形式 1:{name: ruleString} 2.[{name:name, rule:ruleString}...] 3.字符串
	 * @param values
	 * @param isStringPath
	 */
	FormValidation.prototype.validation = function (ruleStringJson, values, isStringPath) {
	    //ruleStringJson是字符串
	    var isString = false;

	    //将ruleStrings的两种形式都转为 {name: {name:name, rule:ruleString}}的形式
	    var maps = {};
	    var resultMaps = {};
	    if (Object.prototype.toString.call(ruleStringJson) === '[object Array]') {
	        //如果是数组形式
	        for (var index in ruleStringJson) {
	            var item = ruleStringJson[index];
	            if (item && item.name && item.rule) {
	                maps[item.name] = item;
	            }
	        }
	    } else if (typeof ruleStringJson == "string") {
	        isString = true;
	        maps['name'] = {
	            rule: ruleStringJson
	        };
	        values = { name: values };
	    } else {
	        for (var name in ruleStringJson) {
	            var ruleString = ruleStringJson[name];

	            if (ruleString) {
	                maps[name] = {
	                    name: name,
	                    rule: ruleString
	                };
	            }
	        }
	    }

	    //循环遍历,然后求出结果数组
	    for (var name in maps) {
	        var value = isStringPath ? getValueByStringPath(values, name) : values[name];

	        resultMaps[name] = this.$validation(value, maps[name], maps[name].rule);
	    }

	    if (isString) {
	        return resultMaps["name"];
	    } else {
	        return resultMaps;
	    }
	};

	// 支持.和[]形式的取值,如从{a:{b:[1]}}中通过"a.b[0]"这样的路径字符串取出值1
	// 支持.和[]形式的取值,如从{a:{b:[1]}}中通过"a.b[0]"这样的路径字符串取出值1
	function getValueByStringPath(json, stringPath) {
	    if (!json) {
	        return "";
	    }

	    var temp = json,
	        path;
	    var paths = stringPath.split(".");
	    for (path = paths.shift(); path; path = paths.shift()) {

	        if (path.indexOf("[") > -1) {
	            var _path = path.split("[")[0];
	            var _paths = path.substr(path.indexOf("[") + 1, path.length - 1).replace(/\]/g, '').split("[");

	            temp = temp[_path];
	            if (temp == null) {
	                return "";
	            }

	            for (_path = _paths.shift(); _path; _path = _paths.shift()) {
	                temp = temp[_path];
	                if (temp == null) {
	                    return "";
	                }
	            }
	        } else {
	            temp = temp[path];
	            if (temp == null) {
	                return "";
	            }
	        }
	    }
	    return temp;
	}

	exports.default = FormValidation;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 *
	 * @param name
	 * @param validation   校验函数、参数是校验
	 * @param msg
	 * @constructor
	 */
	function Rule(name, validation, msg) {
	    if (typeof name !== 'string') {
	        throw new TypeError("校验规则名字必须给定");
	    }
	    if (typeof validation !== 'function') {
	        throw new TypeError("校验规则校验函数必须给定");
	    }
	    if (typeof msg !== 'string' && typeof msg !== 'function') {
	        throw new TypeError("校验规则错误提示必须给定");
	    }

	    this.name = name;
	    this.validation = validation;
	    this.msg = msg;
	}

	exports.default = Rule;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 简化的结果信息,暴露给用户,让用户给出结果和错误信息
	 * @constructor
	 */
	function EasyResult(result, failMessage) {
	  this.result = result;
	  this.failMessage = failMessage;
	}

	exports.default = EasyResult;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 校验的结果信息
	 * @constructor
	 */
	function RuleResult(value, object, result, failMessage) {
	    this.object = object;
	    this.value = value;
	    this.result = result;
	    this.failMessage = failMessage;
	}

	exports.default = RuleResult;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Rule = __webpack_require__(3);

	var _Rule2 = _interopRequireDefault(_Rule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//几种常用正则
	var phoneRegex = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
	var mobileRegex = /^1\d{10}$/;
	var numberRegex = /^[-+]?\d+(\.\d+)?$/;
	var integerRegex = /^[-+]?\d+$/;

	/**
	 * 必填规则
	 */
	var required = new _Rule2.default("required", function (value, object) {
	    for (var _len = arguments.length, fitlers = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        fitlers[_key - 2] = arguments[_key];
	    }

	    return !!value && fitlers.filter(function (item) {
	        return item == value + "";
	    }).length == 0;
	}, "必须填写");

	/**
	 * 最少输入字符数
	 */
	var minSize = new _Rule2.default("minSize", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];
	    var count = arguments[2];

	    return value === "" || value.length >= parseInt(count);
	}, function (value, object, count) {
	    return "最少输入" + count + "个字符数";
	});

	/**
	 * 最多输入字符数
	 */
	var maxSize = new _Rule2.default("maxSize", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];
	    var count = arguments[2];

	    return value === "" || value.length <= parseInt(count);
	}, function (value, object, count) {
	    return "最多输入" + count + "个字符数";
	});

	/**
	 * 	最小值
	 */
	var min = new _Rule2.default("min", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];
	    var number = arguments[2];

	    if (value === "") {
	        return true;
	    } else if (!numberRegex.test(value)) {
	        return false;
	    }
	    return parseFloat(value) >= parseFloat(number);
	}, function (value, object, number) {
	    return "不能小于" + number;
	});

	/**
	 * 	最大值
	 */
	var max = new _Rule2.default("max", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];
	    var number = arguments[2];

	    if (value === "") {
	        return true;
	    } else if (!numberRegex.test(value)) {
	        return false;
	    }
	    return parseFloat(value) <= parseFloat(number);
	}, function (value, object, number) {
	    return "不能大于" + number;
	});

	/**
	 * 	验证数字
	 */
	var number = new _Rule2.default("number", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];

	    return value === "" || numberRegex.test(value);
	}, "必须是数字");

	/**
	 * 	验证整数
	 */
	var integer = new _Rule2.default("integer", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];

	    return value === "" || integerRegex.test(value);
	}, "必须是整数");

	/**
	 * 	验证整数
	 */
	var regex = new _Rule2.default("regex", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];
	    var regex = arguments[2];
	    var config = arguments[3];

	    return value === "" || new RegExp(regex, config).test(value);
	}, "格式错误");

	/**
	 * 	手机校验或电话
	 */
	var mobileOrPhone = new _Rule2.default("mobileOrPhone", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];

	    return value === "" || phoneRegex.test(value) || mobileRegex.test(value);
	}, "电话号码或者手机号格式错误");

	/**
	 * 	电话校验
	 */
	var phone = new _Rule2.default("phone", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];

	    return value === "" || phoneRegex.test(value);
	}, "电话号码格式错误");

	/**
	 * 	手机校验
	 */
	var mobilePhone = new _Rule2.default("mobilePhone", function () {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	    var object = arguments[1];

	    return value === "" || mobileRegex.test(value);
	}, "手机号格式错误");

	/**
	 * 提供的默认的校验库
	 * @constructor
	 */
	exports.default = [required, max, min, maxSize, minSize, number, integer, regex, mobileOrPhone, phone, mobilePhone];

/***/ }
/******/ ])
});
;