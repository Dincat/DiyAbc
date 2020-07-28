function getQueryStringRegExp(url, name) {
    var reg = new RegExp("(^|\?|&)" + name + "=([^&]*)(\s|&|$)", "i");
    if (reg.test(url)) return unescape(RegExp.$2.replace(/+/g, " "));
    return "";
}
function get_$fild_value() {
    var alink = document.querySelector("$xpath");
    var textContent = getQueryStringRegExp(alink, "$reg");// 
    return textContent;
}