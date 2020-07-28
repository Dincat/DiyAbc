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

        //课程信息
        var logo = document.querySelector("div.course-info>div>div>img").getAttribute("data-echo");
        var title = document.querySelector("div.course-info>div>div>h1>a").textContent;

        //学校信息
        var xuexiao = document.querySelector("div.course-info>div>h2>a");
        var xuexiao_href = xuexiao.href;
        //var xuexiao_tile = xuexiao.textContent;

        var matchReg1 = /(?<=xuexiao-)\d*?(?=.html)/;

        var t1 = xuexiao_href.match(matchReg1);
        if (t1 == null) {
            mylog.log("信息提取错误！" + xuexiao_href);
            return;
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
        mylog.log("地址:" + dir);

        //上课地点
        var address = document.querySelectorAll("div.class-address>div")[1].textContent;

        //课程介绍
        var info = document.querySelector("div.info-block>div");

        //   mylog.log(address + "" + info.textContent);
        //info.style.remove();
        //info.className = "";
        var eles = info.querySelectorAll(':not([style=""])');
        // alert(eles.length);
        eles.forEach(function (ele) {
            ele.style = null;
            // alert("ddddd:" + ele.outerHTML);
        });

        var imgs = info.querySelectorAll("img");
        imgs.forEach(function (img) {
            //替换图片
            var md5 = mycmds.md5(img.src);
            img.src = mycmds.UploadImage(img.src, dir, md5 + ".png");
            mylog.log("2222内容图片：" + img.src);
        });

        //put2("from_url", urlkey);//提交数据
        //
        // post();
        //show2();

        var reg1 = /(?<=kecheng-)\d*?(?=.html)/;
        var id1 = urlkey.match(reg1);
        if (id1 == null) {
            id1 = 1;
        }

        //提交到数据库

        var td2 = new FormData();

        td2.set("contact_name", "");
        td2.set("contact_phone", "");

        td2.set("description", info.outerHTML);
        td2.set("from_source", "厚学网");
        td2.set("from_url", urlkey);

        td2.set("is_zhaoshang", 4);//在线课程
        td2.set("keyword", keywords);

        td2.set("ot_price", 0);
        td2.set("price", 0);

        td2.set("store_info", title);
        td2.set("store_name", title);

        td2.set("sales", Math.floor(Math.random() * 1000));//0-1000之间的数据

        var md5 = mycmds.md5(logo);
        var logourl = mycmds.UploadImage(logo, dir, md5 + ".png");
        var images = [];
        images.push(logourl);
        //分类
        var cate_id = [];
        cate_id.push(76);


        td2.set("image", images);
        td2.set("cate_id", cate_id);//[] 数组
        td2.set("slider_image", images);

        td2.set("is_show", 1);

        td2.set("ficti", Math.floor(Math.random() * 1000));
        td2.set("stock", Math.floor(Math.random() * 1000));

        td2.set("media_url", "");
        td2.set("from_url", address);


        post(td2, id1);//保存
    }
    catch (e) {
        mylog.log("机构首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();