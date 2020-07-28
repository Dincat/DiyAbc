function get_Name() {
    var list = document.getElementsByClassName('txt_list')[0];
    var li = list.getElementsByTagName("li")[0];
    //var rttext = li.firstElementChild.getAttribute("src");
    var rttext = li.firstElementChild.src;//获取的是绝对路径
    return rttext;
}
get_Name();
