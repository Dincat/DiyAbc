var urlkey = window.location.href;
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

    var action = "http://www.diyabc.com/api/teacher/third_save";
    var objData = {};
    tformData.forEach((value, key) => objData[key] = value);

    var idObj = mycmds.read(urlkey, mydir, "main_id.json");//读取id
    var ido = JSON.parse(idObj);
    if (ido.data != null) {
        objData["shop_id"] = ido.data.id;
        var last = JSON.stringify(objData);
        //mylog.log(last);
        var rt = mycmds.Submit(urlkey, action, last, mydir, "laoshi_" + id);
        mylog.log(rt);
    }
    else {
        mylog.log("找不到商户信息");
    }
}
function get_Infor() {
    try {

        var matchReg1 = /(?<=xuexiao-)\d*?(?=-laoshi.html)/;
        var matchReg2 = /(?<=xuexiao-)\d*?(?=-laoshi.html)/;
        var t1 = urlkey.match(matchReg1);
        if (t1 == null) {
            t1 = urlkey.match(matchReg2);
        }

        var dir = t1 + "\\images";
        mydir = t1 + "";
        var path = "bj";//这里要获取首页对象
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

        var title = document.title.replace("厚学网", "diyabc");;
        var sss = title.split("-");
        title = sss[2];
        var keyw1 = sss[0].replace("厚学网", "diyabc");;
        var keyw2 = sss[1].replace("厚学网", "diyabc");;

        put2("keyw1", keyw1);
        put2("keyw2", keyw2);

        put2("title", title);
        var metaEle = document.getElementsByTagName("meta");

        var keywords = metaEle[7].content.replace("厚学网", "diyabc");;
        put2("keywords", keywords);
        var description = metaEle[8].content.replace("厚学网", "diyabc");;
        put2("description", description);

        var info = document.querySelectorAll("li.info-teacher>a");
        var i = 0;
        info.forEach(function (th) {

            var detailUrl = th.href;//教师详细页面，推入到顶端
            mylog.log("优先入队：" + detailUrl);//
            mylink.AddTop(detailUrl);

            //var reg1 = /(?<=laoshi-)\d*?(?=.html)/;
            //var id1 = detailUrl.match(reg1);
            //if (id1 == null) {
            //    id1 = i + 1;
            //}

            //var avtar = th.querySelector("div.img-box>img").getAttribute("data-echo");
            //// alert(avtar);
            //var name = th.querySelector("div.info-box>div>h2").textContent;
            //var content = th.querySelector("div.info-box>div>p").textContent + "";
            //content = content.substring(5);
            //var md5 = mycmds.md5(avtar);
            ////提交到数据库
            //var td2 = new FormData();
            //td2.set("seo_keywords", keywords);
            //td2.set("seo_description", description);

            //td2.set("name", name);
            //td2.set("avatar", mycmds.UploadImage(avtar, dir, md5 + ".png"));
            //td2.set("subject", content); 
            //td2.set("job_level", content); 
            //td2.set("description", content); 

            ////推入教师简介明细页面

            //post(td2, id1);//保存
        });


        //
        // post();
        //show2();
    }
    catch (e) {
        mylog.log("机构首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();