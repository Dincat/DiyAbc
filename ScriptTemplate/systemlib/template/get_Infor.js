var urlkey = window.location.href;
var formData2 = new FormData();
var mytemplate123 = mytemplate; 
var mydir = "temp";
var is_post = true;
function post(tformData, id) {
    var action = "$action";
    var objData = {};
    if (action.indexOf("http") < 0) {
        //__seo_keywords __seo_description
        var eleKeywords = document.querySelector("meta[name*=Keywords]");
        var eleDescription = document.querySelector("meta[name*=Description]");
        tformData.append("__eleKeywords", eleKeywords.getAttribute("content"));
        tformData.append("__eleDescription", eleDescription.getAttribute("content"));
        tformData.append("__from_url", urlkey);
        tformData.append("__title", document.title);
    }
    tformData.forEach((value, key) => objData[key] = value);
    var jsonData = JSON.stringify(objData);
    if (is_post) {
        var rt = mycmds.Submit(urlkey, action, jsonData, mydir, "t_" + id);
        mylog.log(rt);
    }
    return jsonData;
}
function get_Infor() {
    try {
        mydir = "temp";// 
        var id = mycmds.md5(urlkey);// 
        var td2 = new FormData();
        //td2.append("store_name", get_store_name());
$data
        td2.append("from_url", urlkey);
        return post(td2, id);// 
    }
    catch (e) {
        mylog.log("error:" + e);
        return "{error:'错误'}";
    }
    return "ok";
}
is_post = true;
get_Infor();