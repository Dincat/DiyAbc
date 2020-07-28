function get_$fild_value() {
    var ele = document.querySelector("$xpath");
    if (ele == null) return "";
    var description = ele.content.replace("", "");
    return description;
}