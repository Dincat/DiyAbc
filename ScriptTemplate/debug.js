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
function post() {

    var action = "http://www.diyabc.com/api/store_info/third_save";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            alert(xmlHttp.responseText);
        }
    }
    xmlHttp.open("post", action);

    var objData = {};
    formData2.forEach((value, key) => objData[key] = value);
    var last = JSON.stringify(objData);
    var sign = mycmds.sign(last);//sign

    // mylog.log(last);

    formData2.set("sign", sign);
    xmlHttp.send(formData2);
}
function get_Infor() {

    var matchReg1 = /(?<=xuexiao-)\d*?(?=.html)/;
    var matchReg2 = /(?<=xuexiao-)\d*?(?=.html)/;
    var t1 = urlkey.match(matchReg1);
    if (t1 == null) {
        t1 = urlkey.match(matchReg2);
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

    var address = document.querySelectorAll("div.class-address>div")[1].textContent;

    var info = document.querySelector("div.info-block>div");

    mylog.log(address + "" + info.textContent);

    var imgs = info.querySelectorAll("img");
    imgs.forEach(function (img) {
        mylog.log("内容图片：" + img.src);
        //替换图片
    });

    //获取分校地址
    //打印替换图片之后的信息-看看地址是否变动了

    put2("image", "https://w17w.oss-cn-beijing.aliyuncs.com/eea48202005111149275332.png");//提交数据
    put2("from_url", urlkey);//提交数据
    //
    // post();
    //show2();
    

    return "ok";
}
get_Infor();