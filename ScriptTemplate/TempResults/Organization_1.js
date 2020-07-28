function get_Name() {
    var list = document.getElementById('foot');
    var li = list.innerText;
    var rttext = li.split("【")[0];
    return rttext+"";
}
get_Name();