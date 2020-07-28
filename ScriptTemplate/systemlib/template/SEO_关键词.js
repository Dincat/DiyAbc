function get_$fild_value() {
    var ele = document.querySelector("$xpath");
    if (ele == null) return "";
    var keywords = ele.content.replace("", "");
    return keywords;
}