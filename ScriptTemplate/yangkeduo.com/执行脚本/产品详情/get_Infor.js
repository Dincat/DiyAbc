var urlkey = window.location.href;
var formData2 = new FormData();

var mytemplate123 = mytemplate;
var dir = '';

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
    var action = baseUrl + "/api/product/create";
    var objData = {};
    tformData.forEach((value, key) => objData[key] = value);

    //objData["shop_id"] = ido.data.id;
    var last = JSON.stringify(objData);
    // mylog.log(last);
    var rt = mycmds.Submit2(urlkey, action, last, mydir, "good_" + id);
    mylog.log(rt);
}

//获取商品售价
function getPrice() {
    var dom = document.getElementsByClassName('container')[0];
   
    if (!dom) {
        mylog.log("no price dom");
        return 0;
    }     

    var spanList = dom.querySelectorAll("span");
    if (!spanList) {
        mylog.log("no price span");
        return 0;
    }    
   
    for (var i = spanList.length; i >= 0; i--) {
        var span = spanList[i];

        if (!span) {
            continue;
        }

        if (span.innerText !== '单独购买') {           
            continue;
        }

        var priceDIV = span.parentElement;

        if (!priceDIV) {
            mylog.log('priceDIV is undefined');
            return 0;
        }

        var priceSpans = priceDIV.querySelectorAll('span');

        if (!priceSpans) {
            mylog.log('no price spans');
            return 0;
        }

        var priceSpan = priceSpans[0];

        if (!priceSpan) {
            mylog.log('no price span');
            return 0;
        }

        mylog.log('bbbbbbbb' + priceSpan.innerText);     

        var price = priceSpan.innerText.replace('¥', '').trim();
        mylog.log("aaaaprice：" + price);
        return price;
        

    }
    mylog.log("can not found price");
    return 0;
}

function getDescription() {
    var dom = document.getElementsByClassName('container')[0];

    if (!dom) {
        mylog.log('no descrtption');
        return '';
    }  

    var pList = dom.querySelectorAll("p");

    if (!pList) {
        mylog.log('no descrtption p');
        return '';
    }

    var descDIV;
    var pDesc_title;

    for (var i = 0; i < pList.length; i++) {

        var p = pList[i];
        if (!p) {
            continue;
        }

        if (p.innerText.trim() === '商品详情') {
            pDesc_title = p;
            break;
        }        
    }

    mylog.log('found desc title');

    descDIV = p.parentElement;

    descDIV.removeChild(pDesc_title);

    var imgList = descDIV.querySelectorAll('img');  

    if (!imgList) {
        mylog.log('desc without img');
        return descDIV.innerHTML;
    }

    mylog.log('imgList length:' + imgList.length);

    imgList.forEach(function (img) {
        var src = img.src;
       
        if (!src) {
            src = img.getAttribute('data-src');
        }
        mylog.log("1111src:" + src);
        if (!src) {
            return;
        }
       
        mylog.log("src:" + src);
        var md5 = mycmds.md5(src);
        var extName = getType(src);
        var self_url = mycmds.UploadImage(src, dir, md5 + extName);
        img.src = self_url;

        img.removeAttribute('data-src');
        img.removeAttribute('style');
        img.removeAttribute('width');
        img.removeAttribute('height');
        img.removeAttribute('class');
        img.removeAttribute('data-was-processed');
       
        img.parentElement.removeAttribute('style');
    });

    return descDIV.innerHTML;


}


function get_Infor() {

    try {

        var shop_id = mycmds.getLoginShopID();
        if (!shop_id) {
            mylog.log('请先登录');
            return;
        }

        //商品名称
        var store_name = document.getElementsByClassName('enable-select')[0].innerText;
        mylog.log("store_name:" + store_name);

        //商品简介（拼多多无商品简介）
        var store_info ="";
       


        //获取商品售价
        var str_price = getPrice();
        mylog.log("str_price：" + str_price);
        var price = getPrice();

        if (!price) {
            mylog.log("商品价格获取失败：" + str_price);
        }

        mylog.log("商品价格：" + price);

        var item_id = getQueryVariable('goods_id');

        mylog.log("pingduoduo_item_id:" + item_id);
        dir = 'pingduoduo_' + item_id


        //获取商品原价
        var str_ot_price = document.getElementsByTagName('del')[0];
        if (str_ot_price) {
            str_ot_price = str_ot_price.innerText;
        }

        var ot_price = 0;

        if (str_ot_price) {
            ot_price = parseFloat(str_ot_price.replace('¥', '').trim());
        }

        if (ot_price <= 0) {
            ot_price = price
            mylog.log("获取商品原价失败：" + str_ot_price);
        }

        mylog.log("ot_price:" + ot_price);


        //获取商品详情
        var description = getDescription();
        mylog.log("description:" + description);


        //获取主图及轮换图片
        var adUrls = new Array();
        var adImages = document.getElementById('banner').querySelectorAll("img");
        adImages.forEach(function (img) {
            var src = img.src;
            mylog.log("ad src:" + src);     
            var md5 = mycmds.md5(src);

            var extName = getType(src);
            var self_url = mycmds.UploadImage(src, dir, md5 + extName);
            adUrls.push(self_url);
        });


       
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

        //td2.append("media_url", video_src);
        td2.append("cate_id", mycmds.getGoodCategoryID());
        td2.append("is_zhaoshang", mycmds.getGoodIsZhaoshangID());
        td2.append("shop_id", mycmds.getLoginShopID());
        td2.append("ficti", random(100, 10000));
        td2.append("stock", random(1000, 10000));
        td2.append("from_source", "拼多多");
        td2.append("from_url", window.location.href);

        //mylog.log("formData:" + JSON.stringify(td2));
        post(td2, item_id);//保存
    }
    catch (e) {
        mylog.log("产品详情首页出错!!!!!!" + e);
    }
    return "ok";
}
get_Infor();