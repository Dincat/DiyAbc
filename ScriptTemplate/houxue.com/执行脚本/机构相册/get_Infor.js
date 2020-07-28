var urlkey = window.location.href;
var formData = new FormData();
var formData2 = new FormData();

var mytemplate123 = mytemplate;

function put2(key, value) {
    formData2.set(key, value);
}

function get2(key) {
    return formData2.get(key);
}


function show2() {
    //alert("dddddd");
    var objData = {};
    formData2.forEach((value, key) => objData[key] = value);
    objData["src_url"] = urlkey;
    var last = JSON.stringify(objData);
    mylog.log(last);
}
function save() {
    //保存到磁盘
    var md5 = mycmds.md5(urlkey);

    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    objData["src_url"] = urlkey;
    var last = JSON.stringify(objData);
    //var ssss = mycmds.sign(last);//sign
    //  alert(ssss);
    mycmds.Save(urlkey, md5, md5, last);
}
var mydir = "";
function post(tformData, id) {

    var action = "http://www.diyabc.com/api/store_info/third_photo_save";

    var objData = {};
    tformData.forEach((value, key) => objData[key] = value);

    var idObj = mycmds.read(urlkey, mydir, "main_id.json");//读取id
    var ido = JSON.parse(idObj);
    if (ido.data != null) {
        objData["shop_id"] = ido.data.id;
        var last = JSON.stringify(objData);
        //mylog.log(last);
        var rt = mycmds.Submit(urlkey, action, last, mydir, "photo_" + id);
        mylog.log(rt);
    }
    else {
        mylog.log("找不到商户信息");
    }

}
function get_Infor() {
    try {

        var matchReg1 = /(?<=xuexiao-)\d*?(?=-photo.html)/;
        var matchReg2 = /(?<=xuexiao-)\d*?(?=-photo.html)/;
        var t1 = urlkey.match(matchReg1);
        if (t1 == null) {
            t1 = urlkey.match(matchReg2);
        }
        mydir = t1 + "";

        var path = "bj";//这里要获取首页对象
        //var pathreg = /(?<=\.com\/).*?(?=\/xuexiao-)/;
        //path = temphref.match(pathreg);

        var idObj = mycmds.IsExit2(urlkey, mydir, "main.json");//
        if (!idObj) {
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + ".html");
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-jianjie.html");
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-kecheng.html");
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-laoshi.html");
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-fenxiaoqu.html");
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-photo.html");
            mylog.log("不是从索引进入，删除缓存........重新下载");
            return;
        }


        var dir = t1 + "\\images";

        var title = document.title;
        var sss = title.split("-");
        title = sss[2];
        var keyw1 = sss[0];
        var keyw2 = sss[1];

        put2("keyw1", keyw1);
        put2("keyw2", keyw2);

        put2("title", title);
        var metaEle = document.getElementsByTagName("meta");

        var keywords = metaEle[7].content;
        put2("keywords", keywords);
        var description = metaEle[8].content;
        put2("description", description);

        var info = document.querySelectorAll("div.main-album1>a>img");
        var i = 0;
        info.forEach(function (th) {
            // var left = th.querySelector("div.onepicbox-f1-l>img").getAttribute("data-echo");
            var title = th.alt;
            var tsrc = th.src;//只取第一个 
            //提交到数据库
            var td2 = new FormData();
            td2.set("name", title);
            td2.set("seo_keywords", title);
            td2.set("seo_description", title);

            var md5 = mycmds.md5(tsrc);
            td2.set("url", mycmds.UploadImage(tsrc, dir, md5 + ".png"));
            post(td2, (i + 1));//保存主校区
            i++;
        });
    }
    catch (e) {
        mylog.log("机构首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();