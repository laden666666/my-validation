var myValidation = require('../dist/my-validation');
var assert = require('chai').assert;


describe('myValidation', function() {

    myValidation.registerRule("logParameter", function () {
        return false;
    }, function () {
        return JSON.stringify(Array.prototype.slice.call(arguments).splice(2,arguments.length - 2));
    });

    myValidation.registerRule("returnMsg", function () {
        return myValidation.result(false, "自定义错误!");
    }, function () {
        return "";
    });

    it('多个参数测试', function() {
        var result = myValidation.validation({
            multipleParameter : "logParameter[1,2,test]",
        },{
            multipleParameter : null,
        })
        //多个参数测试
        assert.equal("[\"1\",\"2\",\"test\"]", result.multipleParameter[0].failMessage);
    });

    it('多个校验条件测试', function() {
        var result = myValidation.validation({
            multipleRule : "logParameter[test1];logParameter[test2]",
        },{
            multipleRule: null,
        })
        //多个校验条件测试
        assert.equal(2, result.multipleRule.length);
    });

    it('参数转义测试', function() {
        var result = myValidation.validation({
            transferred : "logParameter[[];;,;,]",
        },{
            transferred: null,
        })
        //参数转义测试
        assert.equal("[\"[];\",\",\"]", result.transferred[0].failMessage);
    });

    it('必填校验', function() {
        var result = myValidation.validation({
            required1 : "required",
            required2 : "required",
            required3 : "required[0,1]",
            required4 : "required[0,1]",
            required5 : "required[0,1]",
            required6 : "required[0,1]",
            required7 : "required[,1]",
            required8 : "required",
            required9 : "required",
        },{
            required1: "",
            required2: "true",
            required3: "0",
            required4: "1",
            required5: "2",
            required6: 1,
            required7: "",
            required8: null,
            required9: undefined,
        })
        //参数转义测试
        assert.equal(false, result.required1[0].result)
        assert.equal(true, result.required2[0].result);
        assert.equal(false, result.required3[0].result);
        assert.equal(false, result.required4[0].result);
        assert.equal(true, result.required5[0].result);
        assert.equal(false, result.required6[0].result);
        assert.equal(false, result.required7[0].result);
        assert.equal(false, result.required8[0].result);
        assert.equal(false, result.required9[0].result);
    });

    it('字符串长度小于于校验', function() {
        var result = myValidation.validation({
            minSize1 : "minSize[5]",
            minSize2 : "minSize[5]",
            minSize3 : "minSize[5]",
            minSize4 : "minSize[5]",
            minSize5 : "minSize[5]",
        },{
            minSize1: "1234",
            minSize2: "12345",
            minSize3: "123456",
            minSize4: null,
            minSize5: undefined,
        })
        //字符串长度小于于校验
        assert.equal(false, result.minSize1[0].result)
        assert.equal(true, result.minSize2[0].result);
        assert.equal(true, result.minSize3[0].result);
        assert.equal(true, result.minSize4[0].result);
        assert.equal(true, result.minSize5[0].result);
    });

    it('字符串长度大于校验', function() {
        var result = myValidation.validation({
            maxSize1 : "maxSize[5]",
            maxSize2 : "maxSize[5]",
            maxSize3 : "maxSize[5]",
            maxSize4 : "maxSize[5]",
            maxSize5 : "maxSize[5]",
        },{
            maxSize1: "1234",
            maxSize2: "12345",
            maxSize3: "123456",
            maxSize4: null,
            maxSize5: undefined,
        })
        //字符串长度大于校验
        assert.equal(true, result.maxSize1[0].result)
        assert.equal(true, result.maxSize2[0].result);
        assert.equal(false, result.maxSize3[0].result);
        assert.equal(true, result.maxSize4[0].result);
        assert.equal(true, result.maxSize5[0].result);
    });

    it('校验数字不大于', function() {
        var result = myValidation.validation({
            max1 : "max[5]",
            max2 : "max[5]",
            max3 : "max[5]",
            max4 : "max[5]",
            max5 : "max[5]",
            max6 : "max[5]",
            max7 : "max[5]",
        },{
            max1: "4",
            max2: "5",
            max3: "6",
            max4: "notNumber",
            max5: "5notNumber",
            max6: null,
            max7: undefined,
        })
        //校验数字不大于
        assert.equal(true, result.max1[0].result)
        assert.equal(true, result.max2[0].result);
        assert.equal(false, result.max3[0].result);
        assert.equal(false, result.max4[0].result)
        assert.equal(false, result.max5[0].result);
        assert.equal(true, result.max6[0].result);
        assert.equal(true, result.max7[0].result);
    });

    it('数字校验', function() {
        var result = myValidation.validation({
            number1 : "number",
            number2 : "number",
            number3 : "number",
            number4 : "number",
            number5 : "number",
            number6 : "number",
            number7 : "number",
            number8 : "number",
            number9 : "number",
            number10: "number",
        },{
            number1 : "0",
            number2 : "-1",
            number3 : "1",
            number4 : "-1.1",
            number5 : "1.1",
            number6 : "01",
            number7 : "01x",
            number8 : "x01",
            number9: null,
            number10: undefined,
        })
        //数字校验
        assert.equal(true, result.number1[0].result)
        assert.equal(true, result.number2[0].result);
        assert.equal(true, result.number3[0].result);
        assert.equal(true, result.number4[0].result)
        assert.equal(true, result.number5[0].result);
        assert.equal(true, result.number6[0].result);
        assert.equal(false, result.number7[0].result);
        assert.equal(false, result.number8[0].result);
        assert.equal(true, result.number9[0].result);
        assert.equal(true, result.number10[0].result);
    });

    it('整数校验', function() {
        var result = myValidation.validation({
            integer1 : "integer",
            integer2 : "integer",
            integer3 : "integer",
            integer4 : "integer",
            integer5 : "integer",
            integer6 : "integer",
            integer7 : "integer",
            integer8 : "integer",
            integer9 : "integer",
            integer10 : "integer",
        },{
            integer1 : "0",
            integer2 : "-1",
            integer3 : "1",
            integer4 : "-1.1",
            integer5 : "1.1",
            integer6 : "01",
            integer7 : "01x",
            integer8 : "x01",
            integer9: null,
            integer10: undefined,
        })
        //整数校验
        assert.equal(true, result.integer1[0].result)
        assert.equal(true, result.integer2[0].result);
        assert.equal(true, result.integer3[0].result)
        assert.equal(false, result.integer4[0].result);
        assert.equal(false, result.integer5[0].result)
        assert.equal(true, result.integer6[0].result);
        assert.equal(false, result.integer7[0].result)
        assert.equal(false, result.integer8[0].result);
        assert.equal(true, result.integer9[0].result);
        assert.equal(true, result.integer10[0].result);
    });

    it('自定义value非字符串情况', function() {
        myValidation.registerRule('imageCount', function (value, name, count) {
            count = count || 0;
            return value.length >= parseInt(count);
        }, function (value, name, count) {
            return "图片必须大于" + count + "张";
        })

        var result = myValidation.validation({
            "imageCount" : "imageCount[2]",

        },{
            imageCount : ['1']
        })
        //自动路径匹配测试
        assert.equal(false, result["imageCount"][0].result)
    });

    it('自动路径匹配测试', function() {
        var result = myValidation.validation({
            "path1.path2" : "required",
            "path3.path4" : "required",

        },{
            path1 : {
                path2 : "test"
            }
        },true)
        //自动路径匹配测试
        assert.equal(true, result["path1.path2"][0].result)
        assert.equal(undefined, result["path3.path2"])
    });

    it('自定义错误提示', function() {
        var result = myValidation.validation({
            "returnMsg" : "returnMsg",

        },{
            "returnMsg" : ""
        })
        //自定义错误提示
        assert.equal(false, result.returnMsg[0].result)
        assert.equal("自定义错误!", result.returnMsg[0].failMessage)
    });

    it('正则表达式', function() {
        var result = myValidation.validation("regex[^[a-z]*$]", "test");
        assert.equal(true, result[0].result)
        result = myValidation.validation("regex[^[a-z]*$,i]", "TEST");
        assert.equal(true, result[0].result)
        result = myValidation.validation("regex[^[a-z]*$]", "TEST");
        assert.equal(false, result[0].result)
        result = myValidation.validation("regex[^[a-z]*$]", null);
        assert.equal(true, result[0].result)
        result = myValidation.validation("regex[^[a-z]*$]", undefined);
        assert.equal(true, result[0].result)
    });

    it('电话号码', function() {
        var result = myValidation.validation("phone", "8342345");
        assert.equal(true, result[0].result)
        result = myValidation.validation("phone", "83423451");
        assert.equal(true, result[0].result)
        result = myValidation.validation("phone", "834234519");
        assert.equal(false, result[0].result)
        result = myValidation.validation("phone", "010-83424519");
        assert.equal(true, result[0].result)
        result = myValidation.validation("phone", "0109-83424519");
        assert.equal(true, result[0].result)
        result = myValidation.validation("phone", null);
        assert.equal(true, result[0].result)
        result = myValidation.validation("phone", undefined);
        assert.equal(true, result[0].result)
    });

    it('手机号', function() {
        var result = myValidation.validation("mobilePhone", "13834344545");
        assert.equal(true, result[0].result)
        result = myValidation.validation("mobilePhone", "23834344545");
        assert.equal(false, result[0].result)
        result = myValidation.validation("mobilePhone", "138343445453");
        assert.equal(false, result[0].result)
        result = myValidation.validation("mobilePhone", "1383434454");
        assert.equal(false, result[0].result)
        result = myValidation.validation("mobilePhone", "1383434454A");
        assert.equal(false, result[0].result)
        result = myValidation.validation("mobilePhone", null);
        assert.equal(true, result[0].result)
        result = myValidation.validation("mobilePhone", undefined);
        assert.equal(true, result[0].result)
    });

    it('直接字符串验证', function() {
        var result = myValidation.validation("required", "test");
        assert.equal(true, result[0].result)
        result = myValidation.validation("required", "");
        assert.equal(false, result[0].result)
        var result = myValidation.validation("required;mobilePhone", "");
        assert.equal(false, myValidation.analyseResult(result))
        var result = myValidation.validation("required;mobilePhone", "12324");
        assert.equal(false, myValidation.analyseResult(result))
    });

    it('结果分析函数', function() {
        var result = myValidation.validation("required", "");
        assert.equal(false, myValidation.analyseResult(result));

        result = myValidation.validation({required:"required"}, {required:""});
        assert.equal(false, myValidation.analyseResult(result));
    });

    it('验证数组规则', function() {
        var result = myValidation.validation([{
            name: "required",
            rule: "required"
        }],{"required":"test"});
        assert.equal(true, myValidation.analyseResult(result))
        result = myValidation.validation([{
            name: "required",
            rule: "required"
        }],{"required":""});
        assert.equal(false, myValidation.analyseResult(result))
    });



});