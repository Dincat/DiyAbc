var urlkey = window.location.href;
var formData = new FormData();
var formData2 = new FormData();

var mytemplate123 = mytemplate;

function put(key, value) {
    //mycatche.put(urlkey, key, value);
    mylog.log(key + ":" + value);
    formData.set(key, value);
}

function get(key) {
    //return mycatche.get(urlkey, key);
    return formData.get(key);
}

function put2(key, value) {
    formData2.set(key, value);
}

function get2(key) {
    return formData2.get(key);
}

function show() {
    //alert("dddddd");
    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    objData["src_url"] = urlkey;
    var last = JSON.stringify(objData);
    mylog.log(last);
}
function show2() {
    //alert("dddddd");
    var objData = {};
    formData2.forEach((value, key) => objData[key] = value);
    objData["src_url"] = urlkey;
    var last = JSON.stringify(objData);
    mylog.log(last);
}
var mydir = "";
function save() {
    //保存到磁盘
    var md5 = mycmds.md5(urlkey);

    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    objData["src_url"] = urlkey;
    var last = JSON.stringify(objData);
    //var ssss = mycmds.sign(last);//sign
    //  alert(ssss);
    mycmds.Save(urlkey, mydir, "infor", last);
}
function post_data() {
    mylog.log("1111");
    var action = "http://www.diyabc.com/api/store_info/third_save";
    var objData = {};
    formData2.forEach((value, key) => objData[key] = value);
    var last = JSON.stringify(objData);
    var rt = mycmds.Submit(urlkey, action, last, mydir, "main");
    mylog.log(rt);
}
function get_Infor() {
    try {


        var path = "bj";
        var pathreg = /(?<=\.com\/).*?(?=\/xuexiao-)/;
        path = urlkey.match(pathreg);

        var matchReg1 = /(?<=xuexiao-)\d*?(?=.html)/;
        var matchReg2 = /(?<=xuexiao\/)\d*?(?=\/)/;
        var t1 = urlkey.match(matchReg1);
        if (t1 == null) {
            t1 = urlkey.match(matchReg2);
        }
        mydir = t1 + "";
        var path = "bj";//这里要获取首页对象
        var idObj = mycmds.IsExit2(urlkey, mydir, "index.json");//
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

        //添加到最高 处理优先权      
        mylink.AddTop("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-jianjie.html");//必须先开简介-后进后出


        //var dir = t1 + "\\images";
        //mylog.log("dir==" +dir);
        //mydir = t1+"";
        //var title = document.title;
        //var sss = title.split("-");
        //title = sss[2];
        //var keyw1 = sss[0];
        //var keyw2 = sss[1];

        //put2("industry1", keyw1);
        //put2("industry2", keyw2);

        //put2("name", title);//机构名称

        //var metaEle = document.getElementsByTagName("meta");
        //// document.getElementsByName("keywords")
        //var keywords = metaEle[7].content;
        //put2("seo_keywords", keywords);
        //var description = metaEle[8].content;
        //put2("seo_description", description);
        ////document.querySelector('meta[name="seg-user"]').getAttribute('content')

        //var list = document.getElementsByClassName("school-logo")[0];
        //var schoollogo = list.src;
        //schoollogo = mycmds.UploadImage(schoollogo, dir, "logo.png");
        //put2("image", schoollogo);



        //list = document.getElementsByClassName("workPhone")[0];
        //var workphone = list.href;
        //if (workphone && workphone.length > 3) workphone = workphone.substring(4);
        //if (mycmds.IsPhone(workphone)) {
        //    put2("phone", workphone);
        //}
        //else {
        //    put2("phone", t1);//用机构id 作为注册号码
        //}
        //put2("contact_phone", workphone);//联系电话

        //list = document.getElementsByClassName("tel-con")[0].getElementsByTagName("a")[1];
        //var address = list.textContent.substring(5);

        //put2("detailed_address", address);

        //var headerpiclist = document.getElementsByClassName("head-pic");
        //var images = [];
        //for (let i = 0; i < headerpiclist.length; i++) {
        //    var temphref = headerpiclist[i].src;
        //    temphref = mycmds.UploadImage(temphref, dir, "head_" + i + ".png");//上传，并替换图片
        //    images.push(temphref);
        //}

        //put2("photos", JSON.stringify(images));
        ////save();
        ////logo

        //var info = document.querySelector(".info-about>div>div>div");
        //var aaa = info.querySelector("a");
        //if (aaa != null) info.removeChild(aaa);
        //var ddd = info.querySelector("div");
        //if (ddd != null) info.removeChild(ddd);

        //put2("introduction", info.textContent.substring(0,999))
        //put2("description", info.textContent);
        ////mylog.log(info.textContent + "");

        //put2("from_url", urlkey);//提交数据
        //
        // 
        //show2();
        //post_data(); //这里不保存了
    }
    catch (e) {
        mylog.log("机构首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();