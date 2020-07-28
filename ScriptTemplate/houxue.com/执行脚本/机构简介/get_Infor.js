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
var mydir = "";
function save() {
    //保存到磁盘
    var md5 = mycmds.md5(urlkey);

    var objData = {};
    formData2.forEach((value, key) => objData[key] = value);
    //objData["src_url"] = urlkey;
    //读取id信息  
    var idObj = mycmds.read(urlkey, mydir, "main_id.json");
    var ido = JSON.parse(idObj);
    if (ido.data != null) {
        objData["id"] = ido.data.id;
        //alert(objData["id"]);
    }
    var jsonData = JSON.stringify(objData);
    mycmds.Save(urlkey, mydir, "jianjie", jsonData);
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

        //var path = "bj";
        //var pathreg = /(?<=\.com\/).*?(?=\/xuexiao-)/;
        //path = urlkey.match(pathreg);

        var matchReg1 = /(?<=xuexiao-)\d*?(?=-jianjie.html)/;
        var matchReg2 = /(?<=xuexiao-)\d*?(?=-jianjie.html)/;
        var t1 = urlkey.match(matchReg1);
        if (t1 == null) {
            t1 = urlkey.match(matchReg2);
        }

        ////var dir = t1 + "\\images";
        ////mydir = t1 + "";

        ////var title = document.title;
        ////var sss = title.split("-");
        ////title = sss[2];
        ////var keyw1 = sss[0];
        ////var keyw2 = sss[1];

        //put2("keyw1", keyw1);
        //put2("keyw2", keyw2);

        //put2("title", title);
        //var metaEle = document.getElementsByTagName("meta");

        //var keywords = metaEle[7].content;
        //put2("keywords", keywords);
        //var description = metaEle[8].content;
        //put2("description", description);

        var info = document.querySelector("div.info-block>div");

        var eles = info.querySelectorAll(':not([style=""])');
        //alert(eles.length);
        eles.forEach(function (ele) {
            ele.style = null;
            // alert("ddddd:" + ele.outerHTML);
        });

        var imgs = info.querySelectorAll("img");
        imgs.forEach(function (img) {
            mylog.log("内容图片：" + img.src);
            var md5 = mycmds.md5(img.src);
            var alipic = mycmds.UploadImage(img.src, dir, md5 + ".png");
            //替换图片
            img.src = alipic;

        });

        //获取分校地址
        //打印替换图片之后的信息-看看地址是否变动了
        //mylog.log(info.innerHTML + "");


        put2("description", info.innerHTML);//提交数据
        //
        //post();
        //save();
        //show2();

        var dir = t1 + "\\images";
        mylog.log("dir==" + dir);
        mydir = t1 + "";
        var path = "bj";//这里要获取首页对象

        var homepage = document.querySelector("div.header-nav>ul>li>a").href;
        var pathreg = /(?<=\.com\/).*?(?=\/xuexiao-)/;
        path = homepage.match(pathreg);


        var idObj = mycmds.IsExit2(urlkey, mydir, "index.json");// 这里提交保存为 main
        if (!idObj) {
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + ".html")
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-jianjie.html")
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-kecheng.html")
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-laoshi.html")
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-fenxiaoqu.html")
            mycmds.DeleteCatch("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-photo.html")
            mylog.log("不是从索引进入，删除缓存........重新下载");
            return;
        }

        var title = document.title;
        var sss = title.split("-");
        title = sss[2];
        var keyw1 = sss[0];
        var keyw2 = sss[1];

        put2("industry1", keyw1);
        put2("industry2", keyw2);



        var metaEle = document.getElementsByTagName("meta");
        // document.getElementsByName("keywords")
        var keywords = metaEle[7].content.replace("厚学网", "diyabc");;
        put2("seo_keywords", keywords);
        var description = metaEle[8].content.replace("厚学网", "diyabc");;
        put2("seo_description", description);
        //document.querySelector('meta[name="seg-user"]').getAttribute('content')
        var schoollogo = "";

        var list = document.querySelector("img.school-logo");
        //先从文件读取，如果读取不到，那么再采集
        var idObj = mycmds.read(urlkey, mydir, "index.json");//IsExit2
        //alert(mydir);
        var ido = JSON.parse(idObj);
        if (ido.image != null) {
            schoollogo = ido.image;
            //alert(schoollogo);
        }
        else {

            if (list != null) {
                schoollogo = list.getAttribute('data-echo');
                if (schoollogo) {
                    schoollogo = mycmds.UploadImage(schoollogo, dir, "logo.png");
                }
            }
        }
        if (list != null) {
            title = list.alt;
        }
        else {
            //去名称
            title = document.querySelector("div.school-logo-name").textContent;
        }

        put2("name", title);//机构名称
        put2("image", schoollogo);



        var list = document.querySelectorAll("a.workPhone>span")[1];
        var workphone = list.textContent;
        if (mycmds.IsPhone(workphone)) {
            put2("phone", workphone);
        }
        else {
            put2("phone", t1);//用机构id 作为注册号码
        }
        put2("contact_phone", workphone);//联系电话

        var list = document.querySelectorAll("div.tel-con>a")[1].querySelector("p");
        var address = list.textContent.substring(5);

        put2("detailed_address", address);

        var headerpiclist = document.getElementsByClassName("head-pic");
        var images = [];
        for (let i = 0; i < headerpiclist.length; i++) {
            var temphref = headerpiclist[i].src;
            temphref = mycmds.UploadImage(temphref, dir, "head_" + i + ".png");//上传，并替换图片
            images.push(temphref);
        }

        put2("photos", JSON.stringify(images));
        //save();
        //logo

        put2("introduction", description);//简介


        put2("from_url", urlkey);//提交数据
        post_data(); //这里不保存了

        mylink.AddTop("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-fenxiaoqu.html?curfrom=addr");
        mylink.AddTop("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-photo.html");
        mylink.AddTop("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-laoshi.html");
        mylink.AddTop("https://m.houxue.com/" + path + "/xuexiao-" + t1 + "-kecheng.html");

    }
    catch (e) {
        mylog.log("机构首页出错!!!!!!" + e);
    }
    // show2();
    return "ok";
}
get_Infor();