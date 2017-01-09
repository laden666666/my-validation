var myValidation = require("../../my-validation");

//自己注册校验规则
myValidation.registerRule("password",function (value) {
  return /^[0-9a-z]*$/.test(value)
},"必须是数字或英文字符")

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    user: {
      name : "",
      password : "",
      email: "",
    },
    error : {},
  },
  formSubmit: function(e) {
    //表单验证
    var msg = myValidation.validation({
      "user.name":  "required;minSize[2];maxSize[32]",
      //注意password是自己注册的规则
      "user.password":  "required;minSize[6];maxSize[32];password",
      "user.email": "regex[^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+];maxSize[128]"
    },e.detail.value);

    //或者如下方式
    // this.setData(e.detail.value)
    // var msg = myValidation.validation({
    //   "user.name":  "required;minSize[2];maxSize[32]",
    //   //注意password是自己注册的规则
    //   "user.password":  "required;minSize[6];maxSize[32];password",
    //   "user.email": "regex[^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+];maxSize[128]"
    // },this.data ,true);

    //将错误信息放到data中
    this.setData({error:msg});

    if(myValidation.analyseResult(msg)){
      //校验成功
      return;
    }
  },
})
