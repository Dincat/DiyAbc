function get_$fild_value() {
    var ele = document.querySelector("$xpath");
    if (ele == null) return "0";
    var textContent = ele.textContent.replace(" ", "");
    return textContent;
}