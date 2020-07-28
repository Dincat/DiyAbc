function get_Name() {
    var list = document.getElementsByClassName('txt_list')[0];
    var li = list.getElementsByTagName("li")[0];
    if (li.firstElementChild == null)
        return "";
    var rttext = li.firstElementChild.src;//获取的是绝对路径 

    rttext = mycmds.ImageToTex(rttext);//获取的是绝对路径 
    var json = JSON.parse(rttext); // 将字符串转换为JSON对象

    if (json) {
        var rttt = json["words_result"][0];
        if (rttt) {
            var email = rttt["words"];
            rttext = email;
        }
    }
    return rttext;
}
get_Name();