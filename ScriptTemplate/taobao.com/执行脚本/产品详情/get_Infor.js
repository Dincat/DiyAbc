var urlkey = window.location.href;
var formData2 = new FormData();

var mytemplate123 = mytemplate;

function put2(key, value) {
    formData2.append(key, value);
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

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function getType(file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1, index2);
    return type;
}

function getVideoType(file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1, index2);

    if (type.indexOf('?') > 0) {
        type = type.substring(0, type.indexOf('?'));
    }
    return type;
}


function removeImgUrlSuffix(imgUrl) {
    var removeTexts = [".jpg_60x60q90", "_60x60q90.jpg", "_400x400.jpg", "_50x50.jpg"];
    removeTexts.forEach(function (suffix) {
        imgUrl = imgUrl.replace(suffix, '');
    });

    return imgUrl;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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

    var baseUrl = mycmds.getApiBaseUrl();
    var action = baseUrl+"/api/product/create";
    var objData = {};
    tformData.forEach((value, key) => objData[key] = value);

    //objData["shop_id"] = ido.data.id;
    var last = JSON.stringify(objData);
    // mylog.log(last);
    var rt = mycmds.Submit2(urlkey, action, last, mydir, "good_" + id);
    mylog.log(rt);
}



function get_Infor() {

    try {

        var shop_id = mycmds.getLoginShopID();
        if (!shop_id) {
            mylog.log('请先登录');
            return;
        }

        //商品名称
        var store_name = document.getElementsByClassName('tb-main-title')[0].innerText;


        //商品简介
        var store_info = document.getElementsByClassName('tb-main-title')[0];
        if (store_info) {
            store_info = store_info.innerText;
        }


        //获取商品售价
        var str_price = document.getElementsByClassName('tb-rmb-num')[1];
        if (str_price) {
            str_price = str_price.innerText;
        }
      
        var price = 0;

        if (str_price) {
            mylog.log('str_price:' + str_price);
            str_price = parseFloat(str_price.split('-')[0]);
            price= parseFloat(str_price);
        }

        if (price <= 0) {
            mylog.log("商品价格获取失败：" + str_price);
        }



        var taobao_item_id = getQueryVariable('id');

        mylog.log("taobao_item_id:" + taobao_item_id);
        var dir = 'taobao_' + taobao_item_id


        //获取商品原价
        var str_ot_price = document.getElementsByClassName('tb-rmb-num')[0];
        if (str_ot_price) {
            str_ot_price = str_ot_price.innerText;
        }

        var ot_price = 0;

        if (str_ot_price) {
            ot_price = parseFloat(str_ot_price.split('-')[0]);
        }

        if (ot_price <= 0) {
            ot_price = price
            mylog.log("获取商品原价失败：" + str_ot_price);
        }



        //获取商品详情
        var info = document.getElementsByClassName('content')[0];
        var imgs = info.querySelectorAll("img");
        imgs.forEach(function (img) {
            var src = img.getAttribute('data-ks-lazyload');
            mylog.log("data-ks-lazyload:" + src);
            if (!src) {
                src = img.src;
                mylog.log("src:" + src);
            }

            if (!src.startsWith('http') && !src.startsWith('https')) {
                src = "http:" + src;

            }

            //替换图片
            var md5 = mycmds.md5(src);
            img.src = mycmds.UploadImage(src, dir, md5 + ".png");

            if (img.src === '') {
                img.parentElement.removeChild(img);
                return;
            }

            img.removeAttribute('style');
            img.removeAttribute('width');
            img.removeAttribute('height');
        });

        var tables = info.querySelectorAll("table");

        if (tables) {
            tables.forEach(function (item) {
                item.removeAttribute('height');
            });
        }

        var description = info.innerHTML;




        //获取主图及轮换图片
        var adUrls = new Array();
        var adImages = document.getElementsByClassName('tb-thumb tb-clearfix')[0].querySelectorAll("img");
        adImages.forEach(function (img) {
            var src = img.src;
            mylog.log("src:" + src);
            src = removeImgUrlSuffix(src);
            mylog.log("removeImgUrlSuffix:" + src);
            var md5 = mycmds.md5(src);

            var extName = getType(src);
            var self_url = mycmds.UploadImage(src, dir, md5 + extName);
            adUrls.push(self_url);
        });





        //保存视频
        var video_src = document.getElementsByTagName('source')[0];

        if (video_src) {
            video_src = video_src.getAttribute('src');
        }

        if (video_src == undefined) {
            video_src = '';
        }

        mylog.log("video_src:" + video_src);
        if (video_src) {
            var extName = getVideoType(video_src);
            var md5 = mycmds.md5(video_src);

            if (!video_src.startsWith('http') && !video_src.startsWith('https')) {
                video_src = "http:" + video_src;
            }

            video_src = mycmds.UploadImage(video_src, dir, md5 + extName);
        }

        mylog.log("description:" + description);
        var td2 = new FormData();
        td2.append("store_name", store_name);
        td2.append("store_info", store_info);
        td2.append("price", price);
        td2.append("ot_price", ot_price);
        td2.append("description", description);
        td2.append("slider_image", JSON.stringify(adUrls));

        if (adUrls.length > 0) {
            td2.append("image", adUrls[0]);
        }

        td2.append("media_url", video_src);
        td2.append("cate_id", mycmds.getGoodCategoryID());
        td2.append("is_zhaoshang", mycmds.getGoodIsZhaoshangID());
        td2.append("shop_id", mycmds.getLoginShopID());
        td2.append("ficti", random(100, 10000));
        td2.append("stock", random(1000, 10000));
        td2.append("from_source", "淘宝");
        td2.append("from_url", window.location.href);

        //mylog.log("formData:" + JSON.stringify(td2));
        post(td2, taobao_item_id);//保存
    }
    catch (e) {
        mylog.log("产品详情首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();