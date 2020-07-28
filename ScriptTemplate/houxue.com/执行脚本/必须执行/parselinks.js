function get_all_linkes() {

    var domain = window.location.host;// document.domain;
   // alert(window.location.host);
    var ddd = domain.split(".");
    mylog.log(ddd.length + "");
    var myTopDomain = domain;//不支持夸二级域名扫描
   // alert(ddd[0]);
    if (ddd[0] == "m") {
       // alert("ddd");
        return "不支持m.开头的二级域名！";
    }
    
    //alert(iiiiddd); 添加到可执行列表
    let imgs = document.getElementsByTagName('a');
    for (let i = 0; i < imgs.length; i++) {
        var temphref = imgs[i].href;
        //替换网址为标准格式，为最新的  【m】站点 分页格式
        if (temphref.indexOf(myTopDomain) != -1) {
            var path = "bj";
            var pathreg = /(?<=\.com\/).*?(?=\/xuexiao-)/;
            path = temphref.match(pathreg);

            var matchReg1 = /(?<=xuexiao-)\d*?(?=.html)/;
            var matchReg2 = /(?<=xuexiao\/)\d*?(?=\/)/;
 
            var t1 = temphref.match(matchReg1);
            if (t1 == null) {
                t1 = temphref.match(matchReg2);
            }
            if (t1>0) {
                   //这里不建立采集项目，只能由索引页面来建立采集项目
               // mylink.Add("https://m.houxue.com/" + path+"/xuexiao-" + t1 + ".html");
               // mylog.log("建立采集项目：" + "https://m.houxue.com/" + path +"/xuexiao-" + t1 + ".html");
            }
            else {
                mylink.Add(temphref);
            
            }
        }
        else {
            //mylog.log("丢弃！temphref=" + temphref);
        }
    }
    return "ok";
}
get_all_linkes();