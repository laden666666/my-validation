/**
 * 简化的结果信息,暴露给用户,让用户给出结果和错误信息
 * @constructor
 */
function EasyResult( result, failMessage) {
    this.result = result;
    this.failMessage = failMessage;
}

export default EasyResult