var urlkey = window.location.href;

var mytemplate123 = mytemplate;


function show2() {
    //alert("dddddd");
    var objData = {};
    formData2.forEach((value, key) => objData[key] = value);
    objData["src_url"] = urlkey;
    var last = JSON.stringify(objData);
    mylog.log(last);
}
function save(url, dir, filename, formData2) {
    //保存到磁盘
    //var md5 = mycmds.md5(url);
    var objData = {};
    formData2.forEach((value, key) => objData[key] = value);
    objData["src_url"] = url;
    var last = JSON.stringify(objData);
    mylog.log(last);
    mycmds.Save(urlkey, dir, filename, last);
}

var mydir = "";
function post(tformData, id) {

    /* var action = "http://www.diyabc.com/api/live/third_save";*/
    var action = "http://www.diyabc.com/api/product/create";//
    var objData = {};
    tformData.forEach((value, key) => objData[key] = value);

    var idObj = mycmds.read(urlkey, mydir, "main_id.json");//读取id
    var ido = JSON.parse(idObj);
    if (ido.data != null) {
        objData["shop_id"] = ido.data.id;
        var last = JSON.stringify(objData);
        // mylog.log(last);
        var rt = mycmds.SubmitJsonNoSign(urlkey, action, last, mydir, "kecheng_json_" + id);
        mylog.log(rt);
    }
    else {
        mylog.log("找不到商户信息");
    }
}

function get_Infor() {

    try {


        //put2("description", description);
        var i = 0;
        var info = document.querySelectorAll("ul.sch_exclusive_part");
        var i = 0;
        info.forEach(function (th) {

            var alink = th.querySelector("li.sch_exclusive_li>a");
            var timage = th.querySelector("li.sch_exclusive_li>a>img").getAttribute("data-original");

            var temphref = alink.href;


            var matchReg1 = /(?<=xuexiao-)\d*?(?=.html)/;
            var matchReg2 = /(?<=xuexiao\/)\d*?(?=\/)/;
            var t1 = temphref.match(matchReg1);
            if (t1 == null) {
                t1 = temphref.match(matchReg2);
            }

            var formData2 = new FormData();

            mydir = t1 + "";

            formData2.set("mydir", mydir);
            var dir = t1 + "\\images";

            var schoollogo = mycmds.UploadImage(timage, dir, "logo.png");
            formData2.set("image", schoollogo);

            var path = "bj";
            var pathreg = /(?<=\.com\/).*?(?=\/xuexiao-)/;
            path = temphref.match(pathreg);

            var tttturl = "https://m.houxue.com/" + path + "/xuexiao-" + t1 + ".html";

            formData2.set("url", tttturl);

            var title = th.querySelector("div.com-title-box>h2>a");
            var tttt = "未知学校";
            if (title && title.textContent) {
                tttt = title.textContent;
            }
            formData2.set("name", tttt);
            var tel = th.querySelector("div.com-call-box");
            var phone = "";
            if (tel && tel.textContent) {
                phone = tel.textContent;
            }
            formData2.set("phone", phone);
            //下载logo，并且保存索引信息
            save(tttturl, mydir, "index", formData2);
            //建立采集项目-优先队列
            if (i <= 0) {
                mylink.AddTop(tttturl);
            }
            else {
                mylink.Add(tttturl);               
            }
            i++;
            //mylog.log("add Top=" + tttturl);
        });
    }
    catch (e) {
        mylog.log("机构首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();