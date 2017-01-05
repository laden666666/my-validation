var myValidation = require('../dist/my-validation');
var assert = require('chai').assert;


describe('myValidation', function() {

    myValidation.registerRule("logParameter", function () {
        return false;
    }, function () {
        return JSON.stringify(Array.prototype.slice.call(arguments).splice(2,arguments.length - 2));
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
        },{
            required1: "",
            required2: "true",
        })
        //参数转义测试
        assert.equal(false, result.required1[0].result)
        assert.equal(true, result.required2[0].result);
    });

    it('字符串长度小于于校验', function() {
        var result = myValidation.validation({
            minSize1 : "minSize[5]",
            minSize2 : "minSize[5]",
            minSize3 : "minSize[5]",
        },{
            minSize1: "1234",
            minSize2: "12345",
            minSize3: "123456",
        })
        //字符串长度小于于校验
        assert.equal(false, result.minSize1[0].result)
        assert.equal(true, result.minSize2[0].result);
        assert.equal(true, result.minSize3[0].result);
    });

    it('字符串长度大于校验', function() {
        var result = myValidation.validation({
            maxSize1 : "maxSize[5]",
            maxSize2 : "maxSize[5]",
            maxSize3 : "maxSize[5]",
        },{
            maxSize1: "1234",
            maxSize2: "12345",
            maxSize3: "123456",
        })
        //字符串长度大于校验
        assert.equal(true, result.maxSize1[0].result)
        assert.equal(true, result.maxSize2[0].result);
        assert.equal(false, result.maxSize3[0].result);
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
        },{
            number1 : "0",
            number2 : "-1",
            number3 : "1",
            number4 : "-1.1",
            number5 : "1.1",
            number6 : "01",
            number7 : "01x",
            number8 : "x01",
        })
        //字符串长度大于校验
        assert.equal(true, result.number1[0].result)
        assert.equal(true, result.number2[0].result);
        assert.equal(true, result.number3[0].result);
        assert.equal(true, result.number4[0].result)
        assert.equal(true, result.number5[0].result);
        assert.equal(true, result.number6[0].result);
        assert.equal(false, result.number7[0].result);
        assert.equal(false, result.number8[0].result);
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
        },{
            integer1 : "0",
            integer2 : "-1",
            integer3 : "1",
            integer4 : "-1.1",
            integer5 : "1.1",
            integer6 : "01",
            integer7 : "01x",
            integer8 : "x01",
        })
        //字符串长度大于校验
        assert.equal(true, result.integer1[0].result)
        assert.equal(true, result.integer2[0].result);
        assert.equal(true, result.integer3[0].result)
        assert.equal(false, result.integer4[0].result);
        assert.equal(false, result.integer5[0].result)
        assert.equal(true, result.integer6[0].result);
        assert.equal(false, result.integer7[0].result)
        assert.equal(false, result.integer8[0].result);
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
        //字符串长度大于校验
        assert.equal(true, result["path1.path2"][0].result)
        assert.equal(undefined, result["path3.path2"])
    });
});