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
    //mylog.log(last);
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
        // mylog.log(last);
        var rt = mycmds.Submit(urlkey, action, last, mydir, "laoshi_" + id);
        mylog.log(rt);
    }
    else {
        mylog.log("找不到商户信息");
    }
}
function get_Infor() {

    try {


        var dir = t1 + "\\images";
        mydir = t1 + "";
        var title = document.title;
        var sss = title.split("-");
        title = sss[2];
        var keyw1 = sss[0];
        var keyw2 = sss[1];

        put2("keyw1", keyw1);
        put2("keyw2", keyw2);

        put2("title", title);
        var metaEle = document.getElementsByTagName("meta");

        var keywords = metaEle[7].content.replace("厚学网", "diyabc");
        put2("keywords", keywords);
        var description = metaEle[8].content.replace("厚学网", "diyabc");
        put2("description", description);

        var info = document.querySelectorAll("li.info-teacher>a");


        var matchReg1 = /(?<=xuexiao-)\d*?(?=.html)/;
        //学校信息
        var xuexiao = document.querySelector("div.header-nav>ul>li>a");
        var xuexiao_href = xuexiao.href;
        //var xuexiao_tile = xuexiao.textContent;
        var t1 = xuexiao_href.match(matchReg1);
        if (t1 == null) {
            mylog.log("信息提取错误！" + xuexiao_href);
            return;
        }
        mydir = t1 + "";
        var dir = t1 + "\\images";
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


        var reg1 = /(?<=laoshi-)\d*?(?=.html)/;
        var id1 = urlkey.match(reg1);
        if (id1 == null) {
            id1 = i;
        }

        var avtar = document.querySelector("div.teacher-info>img").src;//.getAttribute("data-echo");
        // alert(avtar);
        var name = document.querySelector("div.teacher-info>div>div>h2").textContent;
        var content = document.querySelectorAll("div.teacher-info>div>div>p")[1].textContent + "";
        content = content.substring(3);

        var description2 = "";
        var info = document.querySelector("div.info-block>div");
        var eles = info.querySelectorAll(':not([style=""])');
        //alert(eles.length);
        eles.forEach(function (ele) {
            ele.style = null;
            // alert("ddddd:" + ele.outerHTML);
        });

        description2 = info.outerHTML;

        var md5 = mycmds.md5(avtar);
        //提交到数据库
        var td2 = new FormData();
        td2.set("seo_keywords", keywords);
        td2.set("seo_description", description);

        td2.set("name", name);
        td2.set("avatar", mycmds.UploadImage(avtar, dir, md5 + ".png"));
        td2.set("subject", content);
        td2.set("job_level", content);
        td2.set("description", description2);

        //推入教师简介明细页面

        post(td2, id1);//保存
    }
    catch (e) {
        mylog.log("机构首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();