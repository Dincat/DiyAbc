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

    var matchReg1 = /(?<=xuexiao-)\d*?(?=-kecheng.html)/;
    var matchReg2 = /(?<=xuexiao-)\d*?(?=-kecheng.html)/;
    var t1 = urlkey.match(matchReg1);
    if (t1 == null) {
        t1 = urlkey.match(matchReg2);
    }
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

    var dir = t1 + "\\images";

    var title = document.title.replace("厚学网", "diyabc");;
    var sss = title.split("-");
    title = sss[2];
    var keyw1 = sss[0];
    var keyw2 = sss[1];

    //put2("keyw1", keyw1);
    //put2("keyw2", keyw2);

    //put2("title", title);
    var metaEle = document.getElementsByTagName("meta");

    var keywords = metaEle[7].content.replace("厚学网", "diyabc");;
    //put2("keywords", keywords);
    var description = metaEle[8].content.replace("厚学网", "diyabc");;
    //put2("description", description);
    var i = 0;
    var info = document.querySelectorAll("div.data-list>div>a");
    var cate_id = [];
    cate_id.push(76);
    info.forEach(function (th) {
        //href="https://m.houxue.com/bj/kecheng-792335.html"
        var detailUrl = th.href;//教师详细页面，推入到顶端
        mylog.log("优先入队：" + detailUrl);//
        mylink.AddTop(detailUrl);

       // var reg1 = /(?<=kecheng-)\d*?(?=.html)/;
       // var id1 = detailUrl.match(reg1);
       // if (id1 == null) {
       //     id1 = i + 1;
       // }

       // th = th.querySelector("div");

       // var left = th.querySelector("div.onepicbox-f1-l>img").getAttribute("data-echo");
       // // alert(avtar);
       // var right = th.querySelector("div.onepicbox-f1-r");
       // // mylog.log(right.innerHTML+"ddddd");
       // var title = right.querySelector("h2.onepicbox-f1-r-title").textContent;
       // // mylog.log(title + "title");
       // var number = right.querySelector("div.onepic-bottom>p>span").textContent;//只取第一个
       //// mylog.log(left + title + number);
       // //提交到数据库

       // var td2 = new FormData();
 
       // td2.set("contact_name", "");
       // td2.set("contact_phone", "");

       // td2.set("description", title);
       // td2.set("from_source", "厚学网");
       // td2.set("from_url", urlkey);

       // td2.set("is_zhaoshang", 4);//在线课程
       // td2.set("keyword", keywords);

       // td2.set("ot_price", 0);
       // td2.set("price", 0);

       // td2.set("store_info", title);
       // td2.set("store_name", title);

       // td2.set("sales", 0);

       // var md5 = mycmds.md5(left);
       // var logourl = mycmds.UploadImage(left, dir, md5 + ".png");
       // var images = [];

       // images.push(logourl);
       // td2.set("image", images);
       // td2.set("cate_id", cate_id);//[] 数组
       // td2.set("slider_image", images);

       // td2.set("is_show", 1);

       // td2.set("ficti", 999);
       // td2.set("stock", 888);

       // td2.set("media_url", "");

       // //td2.set("seo_keywords", keywords);
       // //td2.set("seo_description", description);
       // //
       // //td2.set("course_name", title);
       // //td2.set("avatar", mycmds.UploadImage(left, dir, md5 + ".png"));
       // ////td2.set("price", number);
       // //td2.set("description", title);

       // //td2.set("from_url", urlkey);//
       // post(td2, id1);//保存
    });

    //获取分校地址

    //put2("image", "https://w17w.oss-cn-beijing.aliyuncs.com/eea48202005111149275332.png");//提交数据
    //put2("from_url", urlkey);//提交数据
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