function get_$fild_value() {
    var evaluator = new XPathEvaluator(); 
    var result = evaluator.evaluate("$xpath", document.documentElement, null, 
        XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (result == null) return "";

    if (!result.singleNodeValue) {
        return "";
    }

    var textContent = result.singleNodeValue.textContent;
    textContent = textContent.trim();
    textContent = textContent.substr($pos);//从第几个字符开始取
    textContent = textContent.replace("$w", "$tw");
    return textContent;
}