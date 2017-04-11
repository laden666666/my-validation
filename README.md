# my-validation
一个验证库，可用于任意表单的验证的逻辑部分的实现,没有页面、控件、dom操作，仅是逻辑部分。因为没有页面相关部分，所以可以做react native、weex、微信小程序等各个平台的表单验证控件的中逻辑部分的实现，方便配合模板完成复杂的表单验证
### 安装方法:
webpack中使用:
```
npm install git://github.com/laden666666/my-validation --save
```
然后直接用reqiure引用即可
```
var myValidation = require("my-validation");
```
如果是web环境直接script标签引用my-validation.js或者my-validation.min.js文件即可。

---
### 使用方法:
##### 根据规则字符串验证对象：
```
myValidation.validation(ruleStringString, valueString, isStringPath)
```

|	参数	|	参数描述	|
|:---|:---|
|	ruleStringString	|	规则的字符串	|
|	valueString		|	要校验的字符串	|

```
MyValidation.validation(ruleStringJson, values, isStringPath)
```
|	参数	|	参数描述	|
|:---|:---|
|	ruleStringJson	|	规则的字符串的集合	|
|	values		|	要校验的字符串的集合	|
|	isStringPath	|	是否启用lodash的_.property方法的子对象路径名做key方式	|
 >注意：
 >**规则的字符串**是校验的核心，格式是“规则1名[参数1,参数2...];规则2名[参 数1,参数2...]...”。
 >如：**“required;minSize[5]”**表示使用**required规则**校验，校验非空；然后 使用**minSize规则**校验，参数是5，表示字符串长度不能小于5
 >规则的字符串中特殊字符有“;”、“,”两个，需要转义，转义字符分别为“;;”、“;,”

如:
```
var result = myValidation.validation("required;sizeMax[16]", "test");
```
或：
```
var result = myValidation.validation({
    "user.name" : "required;sizeMax[16]",
},{
     user : {
          name : "test"
     }
},true)
```
返回的result是校验规则结果的数组
<br/>
##### 注册自定义规则：
```
myValidation.registerRule(name, validationFn, msg)
```

|	参数	|	参数描述	|
|:---|:---|
|	name	|	规则的名称	|
|	validationFn		|	校验函数	|
|	msg	|	默认的错误提示语句,支持字符串或函数	|

如:
```
myValidation.registerRule("minSize", function (value, object, count) {
    return !!value && value.length >= parseInt(count);
},function (value, object, count) {
    return "最少输入" + count + "个字符数";
});
```
或：
```
myValidation.registerRule("integer", function (value, object) {
    return !!value && /^[-+]?\d+$/.test(value);
}, "必须是整数");
```
 >注意：
 >校验函数是表单校验的核心，他的参数如下：
 >value:     要校验的值
 >object:    校验的对象，包括校验规则原始值
 >...pram:    校验的参数列表，如xx[a,b,c]，这里会解析出3个参数，分别为：“a”、“b”、“c”
 >
 > 同时校验失败的情况下必须返回false或者是调用myValidation.result生成的返回结果，否则视为校验成功。

##### 自定义返回错误提示：

有时候需要在验证的时候动态的生成返回错误，而不是返回默认错误，此时可以使用以下api：
```
myValidation.result (result, msg)
```
|	参数	|	参数描述	|
|:---|:---|
|	result	|	boolean型，校验的结果，仅当false时候表示验证失败	|
|	msg		|	验证失败的字符串，提示这个字符串的优先级比默认字符串高	|

如：

```
myValidation.registerRule("returnMsg", function () {
    return myValidation.result(false, "自定义错误提示");
}, "此为默认提示，会被覆盖掉");
```

##### 分析验证结果：

验证结果是个错误信息的数组,或者是一个key、value形式的json,但是表单验证的结果究竟是成功还是失败,我们无法马上得知。你可以通过遍历各个验证项的result字段,不断一个个相与来获得结果的boolean值,也可以直接使用我们的api函数：

```
myValidation.analyseResult (result)
```

|	参数	|	参数描述	|
|:---|:---|
|	result	|	validation的验证结果	|

如：

```
var result = myValidation.validation({
    "user.name" : "required;sizeMax[16]",
},{
     user : {
          name : "test"
     }
},true);

result = myValidation.analyseResult(result) //result被转为boolean型
```

----

### 默认校验规则库:

|	参数	|	参数描述	|	例子	|
|:---|:---|:---|
|	required	|	必填	|	required |
|	minSize		|	要求字符串长度不大于指定值	|	minSize[5]	|
|	maxSize		|	要求字符串长度不小于指定值	|	maxSize[5]	|
|	min	|	必须是数字，并要求不小于指定值	|	min[5]	|
|	max	|	必须是数字，并要求不大于指定值	|	max[5]	|
|	number	|	必须是数字	|	number	|
|	integer	|	必须是整数	|	integer	|
|	regex	|	正则表达式	|	regex[^\\S{2,4}$,i]	|
|	phone	|	电话	|	phone	|
|	mobilePhone	|	手机	|	mobilePhone	|
|	mobileOrPhone	|	电话或手机	|	mobileOrPhone	|

目前仅提供几个笔者马上要使用的规则，其他规则大家可以自己通过myValidation.registerRule注册。
