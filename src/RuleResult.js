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

export default RuleResult;