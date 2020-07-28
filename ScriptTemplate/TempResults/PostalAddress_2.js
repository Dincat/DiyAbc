function get_Name() {
    var list = document.getElementsByClassName('txt_list')[0];
    var li = list.getElementsByTagName("li")[4].innerText;
    var rttext = li.substring(3);
    return rttext;
}
get_Name();