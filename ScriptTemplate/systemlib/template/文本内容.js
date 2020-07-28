function get_$fild_value() {
    var ele = document.querySelector("$xpath");
    if (ele == null) return "";

    if (!ele) {
        return "";
    }

    var textContent = ele.innerText.trim();
    textContent = textContent.replace("$w", "$tw");
    return textContent;
}