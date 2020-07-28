var urlkey = window.location.href;
var formData = new FormData();
var formData2 = new FormData();

var mytemplate123 = mytemplate;

function put(key, value) {
    //mycatche.put(urlkey, key, value);
    mylog.log(key+":"+value);
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
function save() {
    //保存到磁盘
    var md5 = mycmds.md5(urlkey);

    var objData = {};
    formData.forEach((value, key) => objData[key] = value);
    objData["src_url"] = urlkey;
    var last = JSON.stringify(objData);
    var ssss = mycmds.sign(last);//sign
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
    formData2.set("sign", sign);
    xmlHttp.send(formData2);
}
function get_Infor() {
    var list = document.getElementsByClassName('txt_list')[0];
        //1 读取email 内容 Email_1
    var li = list.getElementsByTagName("li")[3];//第4项数据
    var rttext = "";

    if (li.firstElementChild) {        
    
       var tttt = mycmds.ImageToText(li.firstElementChild.src);//获取的是绝对路径 
        var json = JSON.parse(tttt); // 将字符串转换为JSON对象
        if(json != null) {
            var rttt = json["words_result"][0];
            if (rttt) {
                var email = rttt["words"];
                rttext = email;
            }
        }
    }
    put("Email_1", rttext);
    //2 读取qq内容 IM_1
    rttext = "";
    li = list.getElementsByTagName("li")[5].innerText;
    rttext = li.substring(3);
    put("IM_1", rttext);

    //3 姓名内容 Name_0
    rttext = "";
    li = list.getElementsByTagName("li")[2].innerText;
    rttext = li.substring(4);
    put("Name_0", rttext);
    put2("name", rttext);//提交数据

    //4 备注信息 Note_0
    rttext = "";
    list = document.getElementById('foot');
    li = list.innerText;
    rttext = li.split("【")[0];
    put("Note_0", rttext);

    //5 公司信息 Organization_1
    rttext = "";
    list = document.getElementById('foot');
    li = list.innerText;
    rttext = li.split("【")[0];
    put("Organization_1", rttext);

    //6 电话信息 Phone_2
    rttext = "";
    list = document.getElementsByClassName('txt_list')[0];//重新取值
    li = list.getElementsByTagName("li")[0];
    if (li.firstElementChild) {
        rttext = li.firstElementChild.src;//获取的是绝对路径
 
        rttext = mycmds.ImageToText(rttext);//获取的是绝对路径 
        var json = JSON.parse(rttext); // 将字符串转换为JSON对象
        if (json) {
            var rttt = json["words_result"][0];
            if (rttt) {
                var email = rttt["words"];
                rttext = email;
            }
        }
    }
    put("Phone_2", rttext);
    put2("phone", rttext);//提交数据

    //7 电话信息 Phone_2_0
    rttext = "";
    li = list.getElementsByTagName("li")[1];//第二项数据
    if (li.firstElementChild) {
        rttext = li.firstElementChild.src;//获取的是绝对路径 
        rttext = mycmds.ImageToText(rttext);//获取的是绝对路径 
        var json = JSON.parse(rttext); // 将字符串转换为JSON对象
        if (json) {
            var rttt = json["words_result"][0];
            if (rttt) {
                var email = rttt["words"];
                rttext = email;
            }
        }
    }   
    put("Phone_2_0", rttext); 

    //8 地址信息 PostalAddress_2
    rttext = "";
    li = list.getElementsByTagName("li")[4].innerText;
    rttext = li.substring(3);
    put("PostalAddress_2", rttext);
    put2("detailed_address", rttext);//提交数据

    //save();

    //logo

    put2("image", "https://w17w.oss-cn-beijing.aliyuncs.com/eea48202005111149275332.png");//提交数据
    put2("from_url", urlkey);//提交数据
    //
    post();
   
    return "";
}
get_Infor();